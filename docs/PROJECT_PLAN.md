
# Approach

*Views*
- Root
  - Search Input (Recent searches)
  - Results table
  - Chat sheet (with context?)

*App State*
- Query
- Results
- SelectedResults

*Endpoints*
- GET `/api/trials/` - All trials (limited detail)
  - `?q=` - Query string
  - `?page=` - Pagination
  - `?limit=` - Limit results (default = 20)
- GET `/api/trials/{id}` - Trial details
