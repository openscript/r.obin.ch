import styled from '@emotion/styled';
import { darken } from 'polished';
import LanguageSelector from './LanguageSelector';
import TopNavigation from './TopNavigation';

const TopBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: ${({ theme }) => darken(-0.05, theme.colors.primary)};
  height: 1.5rem;
`;

export default function TopBar() {
  return (
    <TopBarContainer id="top-bar">
      <TopNavigation />
      <LanguageSelector />
    </TopBarContainer>
  );
}
