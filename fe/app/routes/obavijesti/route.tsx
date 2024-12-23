import DefaultError from '@/components/default-error';
import { generateCommonMetaTags } from '@/lib/utils';
import { ErrorResponseCode, errorResponseSchema } from '@/networking/error';
import { prefetchAllPosts } from '@/query/posts.query';
import { MetaFunction, useParams, useRouteError } from '@remix-run/react';
import AllNews from './components/all-news';
import SingleNews from './components/single-news';
import { ALL_ROUTES_DATA_LIMIT } from './constants';
import wpBlockCSS from '@/routes/obavijesti/css/wp-block.min.css?url';
import wpCustomBlockCSS from '@/routes/obavijesti/css/wp-custom-block.css?url';
import { LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: wpBlockCSS,
    type: 'text/css',
  },
  {
    rel: 'stylesheet',
    href: wpCustomBlockCSS,
    type: 'text/css',
  },
];

export async function loader() {
  return prefetchAllPosts(ALL_ROUTES_DATA_LIMIT);
}

export const meta: MetaFunction = () => {
  return generateCommonMetaTags({
    title: 'Obavijesti',
    description: 'Obavijesti MSŠ Gimnazije Bugojno',
  });
};

export default function NewsPage() {
  const { slug } = useParams();

  if (!slug || slug.trim() === '') {
    return <AllNews />;
  }

  return <SingleNews slug={slug} />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  let title = 'Dogodila se greška';
  let subtitle = 'Dogodila se greška prilikom učitavanja vijesti.';
  const errorResponse = errorResponseSchema.safeParse(error);

  if (errorResponse.success && errorResponse.data.code === ErrorResponseCode.NOT_FOUND) {
    title = 'Vijest nije pronađena';
    subtitle = 'Vijest ne postoji ili je izbrisana.';
  }

  return <DefaultError title={title} subtitle={subtitle} />;
}
