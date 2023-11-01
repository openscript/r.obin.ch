import { GatsbySSR } from 'gatsby';
import { polyfill } from 'interweave-ssr';

export const onPreRenderHTML: GatsbySSR['onPreRenderHTML'] = async () => {
  polyfill();
};
