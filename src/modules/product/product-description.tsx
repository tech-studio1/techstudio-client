'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { decode as htmlDecode } from 'he';
import createDOMPurify from 'dompurify';

const decodeSmart = (input: string | string[] | undefined | null): string => {
  if (!input) return '';

  const raw = Array.isArray(input) ? input[0] : input;

  try {
    const uriDecoded = decodeURIComponent(raw);
    return htmlDecode(uriDecoded);
  } catch (e) {
    return htmlDecode(raw);
  }
};

const ProductDescription = ({ product }: { product: any }) => {
  const [safeHtml, setSafeHtml] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const DOMPurify = createDOMPurify(window);
      const decoded = decodeSmart(product?.description);
      const clean = DOMPurify.sanitize(decoded);
      setSafeHtml(clean);
    }
  }, [product?.description]);

  return (
    <div className="my-10 space-y-4 px-2">
      <h2 className="text-lg font-semibold">Description</h2>
      <div
        className="text-gray-600"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    </div>
  );
};

export default ProductDescription;
