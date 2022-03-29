import type { NextApiRequest, NextApiResponse } from 'next';

import { getArrayOfLinks } from 'get-array-of-links';

import { LinkObject } from 'get-array-of-links/dist/parseHTML/getLinkObjects';

export type Data = {
  links?: LinkObject[];
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  let links: LinkObject[] = [];

  // GET /fetchLinks
  if (req.method === 'POST') {
    const result = await getArrayOfLinks(req.body.url, {
      limit: req.body.limit,
      useFilters: req.body.useFilters,
    });
    if (result) links = [...result];
  };

  if (links) res.status(200).json({ links });
  else res.status(500).json({ error: 'Failed to fetch links' });
};
