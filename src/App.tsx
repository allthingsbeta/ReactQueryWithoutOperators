import { useState } from "react";
import QueryBuilder, { formatQuery, RuleGroupType } from "react-querybuilder";
import "react-querybuilder/dist/query-builder.css";

const fields = [
  { name: "Test 1", label: "Test 1" },
  { name: "Test 2", label: "Test 2" },
  { name: "Test 3", label: "Test 3" }
];

const initialQuery: RuleGroupType = {
  id: "root",
  combinator: "and",
  rules: [
    {
      field: "Test 1",
      operator: "=",
      value: ""
    },
    {
      field: "Test 2",
      operator: "=",
      value: ""
    }
  ]
};

export default function App() {
  const [query, setQuery] = useState(initialQuery);

  return (
    <>
      <h4>Query</h4>
      <QueryBuilder
        fields={fields}
        onQueryChange={(q) => setQuery(q)}
        query={query}
        showCombinatorsBetweenRules
        controlElements={{
          operatorSelector: () => null,
          valueEditor: () => null
        }}
      />
      <h4>SQL</h4>
      <div>
        {(formatQuery(query, {
          format: "sql",
          valueProcessor: () => ""
        }) as string).replace(/ =/g, "")}
      </div>
      <h4>JSON</h4>
      <pre>{JSON.stringify(query, ["rules", "field", "combinator"], 2)}</pre>
    </>
  );
}
