import Script from 'next/script';

interface SchemaProps {
  data: Record<string, any>;
  id?: string;
}

export function Schema({ data, id = 'schema-json-ld' }: SchemaProps) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      strategy="afterInteractive"
    />
  );
}
