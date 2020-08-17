import qs, { ParsedQs } from 'qs';

type LocationProps = { search: string };

export function UrlParser(location: LocationProps): ParsedQs {
  return qs.parse(location.search, { ignoreQueryPrefix: true });
}
