--  RUN 1st
create extension vector;

-- RUN 2nd
create table teamplan (
  id bigserial primary key,
  article text,
  section text,
  paragraph text,
  source text,
  content_length bigint,
  content_tokens bigint,
  embedding vector (1536)
);

-- RUN 3rd after running the scripts
create or replace function teamplan_search (
  query_embedding vector(1536),
  similarity_threshold float,
  match_count int
)
returns table (
  id bigint,
  article text,
  section text,
  paragraph text,
  source text,
  content_length bigint,
  content_tokens bigint,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    teamplan.id,
    teamplan.article,
    teamplan.section,
    teamplan.paragraph,
    teamplan.source,
    teamplan.content_length,
    teamplan.content_tokens,
    1 - (teamplan.embedding <=> query_embedding) as similarity
  from teamplan
  where 1 - (teamplan.embedding <=> query_embedding) > similarity_threshold
  order by teamplan.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- RUN 4th
create index on teamplan 
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);
