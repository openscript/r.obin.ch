---
title: Private und geschützte Routen mit React Router
publishedAt: 2021-03-18 17:19:11 +1
tags:
  - React
  - React Router
  - Web technologies
  - Authentication and Authorization
---

[React Router](https://reactrouter.com/) ist eines der meist verbreiteten Werkzeuge, um clientseitiges Routing in React zu realisieren. In der kommenden Version 6 werden sich einige Dinge verändern, wie [die Migrationsanleitung](https://github.com/ReactTraining/react-router/blob/dev/docs/advanced-guides/migrating-5-to-6.md) offenbart.

Ein Anwendungsfall, welchem [immer wieder begegnet](https://stackoverflow.com/questions/47747754/how-to-rewrite-the-protected-private-route-using-typescript-and-react-router-4-a) werden kann, ist das Überprüfen einer Autorisierung und das entsprechende Weiterleiten. Ein Benutzer möchte beispielsweise auf den Pfad `./admin/dashboard` zugreifen. Falls der Benutzer passend authentifiziert und autorisiert ist, wird das Dashboard angezeigt, ansonsten das Anmeldeformular. Nach einer erfolgreichen Anmeldung soll der Benutzer auf den ursprünglich angefragten Pfad weitergeleitet werden.

Um ein Gefühl für die neue React Router Version zu gewinnen, soll eine Migration von Version 5 auf 6 mit dem genannten Anwendungsfall nachvollzogen werden.

## React Router v5

Um den geschilderten Anwendungsfall zu implementieren wird die `<Route>`-Komponente von `react-router` erweitert. Wir React funktional verwendet, so ist die Rede eigentlich eher von einer Komposition als von einer Erweiterung.

```typescript
import { useEffect } from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router';

export type ProtectedRouteProps = {
  // Ist der Aufrufer authentifiziert?
  isAuthenticated: boolean;
  // Pfad zum Anmeldeformular
  authenticationPath: string;
  // Pfad wohin weitergeleitet werden soll, falls authentifiziert
  redirectPath: string;
  // Funktion um den Pfad für eine allfällige Weiterleitung zu setzen
  setRedirectPath: (path: string) => void;
} & RouteProps;

export default function ProtectedRoute({
  isAuthenticated,
  authenticationPath,
  redirectPath,
  setRedirectPath,
  ...routeProps
}: ProtectedRouteProps) {
  const currentLocation = useLocation();

  // Falls der Aufrufer nicht authentifiziert ist, den aktuellen Pfad speichern.
  // Dadurch, das wir den State einer anderen Komponente definieren, muss dies in einem Effect passieren.
  useEffect(() => {
    if (!isAuthenticated) {
      setRedirectPath(currentLocation.pathname);
    }
  }, [isAuthenticated, setRedirectPath, currentLocation]);

  // Falls der Aufrufer authentifiziert und keine Weiterleitung notwendig ist, die angeforderte Route rendern.
  if (isAuthenticated && redirectPath === currentLocation.pathname) {
    return <Route {...routeProps} />;
  } else {
    // Falls eine Weiterleitung notwendig ist je nachdem auf den Pfad vor der Authentifizierung oder zum Anmeldeformular weiterleiten.
    return <Redirect to={{ pathname: isAuthenticated ? redirectPath : authenticationPath }} />;
  }
}
```

Der Pfad für eine allfällige Weiterleitung und ob der Aufrufer Authentifiziert ist, wird im Application State gespeichert. Möglicherweise wird dafür Redux oder eine andere Bibliothek eingesetzt. Um das Beispiel einfach zu halten, wir dies einfach gehalten und in einem React Context gespeichert.

Dafür soll erst einmal ein Model definiert werden, welches beschreibt wie die Datenstruktur des React Contexts aussieht.

```typescript
export type Session = {
  isAuthenticated?: boolean;
  redirectPath: string;
};

export const initialSession: Session = {
  redirectPath: ''
};
```

Um den React Context zu verwenden wird folgende Komponente und folgender Hook zur Verfügung gestellt.

```typescript
import { createContext, useContext, useState } from "react";
import { initialSession, Session } from "../models/session";

export const SessionContext = createContext<[Session, (session: Session) => void]>([initialSession, () => {}]);
export const useSessionContext = () => useContext(SessionContext);

export const SessionContextProvider: React.FC = (props) => {
  const [sessionState, setSessionState] = useState(initialSession);
  const defaultSessionContext: [Session, typeof setSessionState]  = [sessionState, setSessionState];

  return (
    <SessionContext.Provider value={defaultSessionContext}>
      {props.children}
    </SessionContext.Provider>
  );
```

Dieser React Context soll nun der Applikation zur Verfügung gestellt werden.

```typescript
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionContextProvider>
        <App />
      </SessionContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
```

Jetzt kann die `<ProtectedRoute>` für Pfade, welche eine Authentifizierung benötigen eingesetzt werden. Hier ein Beispiel mit verschiedenen Routen:

```typescript
import ProtectedRoute, { ProtectedRouteProps } from '../components/ProtectedRoute';
import { useSessionContext } from '../contexts/SessionContext';
import { Route, Switch } from 'react-router';
import Homepage from './Homepage';
import Dashboard from './Dashboard';
import Protected from './Protected';
import Login from './Login';

export default function App() {
  const [sessionContext, updateSessionContext] = useSessionContext();

  const setRedirectPath = (path: string) => {
    updateSessionContext({ ...sessionContext, redirectPath: path });
  };

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!sessionContext.isAuthenticated,
    authenticationPath: '/login',
    redirectPath: sessionContext.redirectPath,
    setRedirectPath: setRedirectPath
  };

  return (
    <div>
      <Switch>
        <Route exact={true} path="/" component={Homepage} />
        <ProtectedRoute {...defaultProtectedRouteProps} path="/dashboard" component={Dashboard} />
        <ProtectedRoute {...defaultProtectedRouteProps} path="/protected" component={Protected} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}
```

Das vollständige Beispiel ist [hier](https://github.com/openscript/react-router-private-protected-routes/tree/react-router-5) verfügbar.

## React Router v6

Die Migration auf die Version 6 ist ziemlich simpel.

Zuerst müssten die Pakete `react-router` und `react-router-dom` aktualisiert werden. Das Paket `@types/react-router-dom` wird nicht mehr benötigt, da die Typendefinition jetzt in `react-router-dom` integriert ist.

In der Komponente `<ProtectedRoute>` muss nur `<Redirect>` mit `<Navigate>` ersetzt werden. Die Eigenschaft `to` blieb erhalten.

Der Rest bleibt gleich, ausser die Anwendung der `<ProtectedRoute>` (und auch der originalen `<Route>`).

```typescript
import ProtectedRoute, { ProtectedRouteProps } from '../components/ProtectedRoute';
import { useSessionContext } from '../contexts/SessionContext';
import { Route, Routes } from 'react-router';
import Homepage from './Homepage';
import Dashboard from './Dashboard';
import Protected from './Protected';
import Login from './Login';

export default function App() {
  const [sessionContext, updateSessionContext] = useSessionContext();

  const setRedirectPath = (path: string) => {
    updateSessionContext({ ...sessionContext, redirectPath: path });
  };

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!sessionContext.isAuthenticated,
    authenticationPath: '/login',
    redirectPath: sessionContext.redirectPath,
    setRedirectPath: setRedirectPath
  };

  return (
    <div>
      <Routes>
        <Route path="/">
          <Homepage />
        </Route>
        <ProtectedRoute {...defaultProtectedRouteProps} path="dashboard">
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute {...defaultProtectedRouteProps} path="protected">
          <Protected />
        </ProtectedRoute>
        <ProtectedRoute {...defaultProtectedRouteProps} path="nested">
          <Route path="one">
            <Protected />
          </Route>
          <Route path="two">
            <Protected />
          </Route>
        </ProtectedRoute>
        <Route path="login">
          <Login />
        </Route>
      </Routes>
    </div>
  );
}
```

Ersichtlich wird, dass in den Routen die Zielkomponente nicht mehr als Eigenschaft, sondern als Kindelement mitgegeben wird. Dies funktioniert genauso mit unserer `<ProtectedRoute>`. `<Switch>` wurde durch `<Routes>` ersetzt. Auch die Verschachtlung ist kein Problem.

Alles in allem ist die Migration also schnell gemacht. Im selben Repository kann das Beispiel nach der Migration gefunden werden. Hier ist [der Link](https://github.com/openscript/react-router-private-protected-routes/tree/react-router-6) dazu.

## Schlusswort

Die Migration war nicht schwierig. Vor allem die [Anleitung](https://github.com/ReactTraining/react-router/blob/dev/docs/advanced-guides/migrating-5-to-6.md) zur Migration gibt einen schnellen Überblick zu den Änderungen.

Meiner Meinung nach wurde React Router an den richtigen Stellen verbessert. Die einfachere Verschachtlung und auch die Router Outlet Funktion gefallen mir gut.
