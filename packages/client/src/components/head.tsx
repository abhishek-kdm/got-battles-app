import React from 'react';
import Helmet, { HelmetProps } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

import { fontFaceString } from '../utils';

interface HeadProps extends HelmetProps {
  description?: string
  absoluteTitle?: boolean
}

const Head: React.FC<HeadProps> = ({
  title,
  description,
  absoluteTitle,
  children,
  ...rest
}) => {
  const { site, allFile: { fonts }} = useStaticQuery(gqlQuery);

  title = title || site.siteMetadata.title;
  description = description || site.siteMetadata.description;

  return (
    <Helmet {...rest}
      title={title}
      titleTemplate={absoluteTitle ? '%s' : `%s | ${description}`}
      htmlAttributes={{ lang: 'en' }}
      style={[{ cssText: fonts.map(fontFaceString).join('') }]}
    >
      <meta name={`description`} content={description} />
      <meta property={`og:title`} content={title} />
      <meta property={`og:description`} content={description} />
      <meta property={`og:type`} content={`website`} />
      <meta name={`twitter:card`} content={`summary`} />
      <meta name={`twitter:creator`} content={site.siteMetadata.author} />
      <meta name={`twitter:title`} content={title} />
      <meta name={`twitter:description`} content={description} />
      {children}
    </Helmet>
  )
}

const gqlQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
    allFile(filter: {sourceInstanceName: {eq: "fonts"}}) {
      fonts: edges {
        node {
          name
          publicURL
          extension
        }
      }
    }
  }
`;

export default Head;

