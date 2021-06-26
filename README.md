{% assign repo="github-next-version" %}
# github-commit-lint
Checks to see if commit messages meet standards


# {{ repo }}
Checks to see if commit messages meet standards

## Example

```yaml
name: Generate
jobs:
  generate:
    steps:
      - uses: actions/checkout@v2
      - name: 'Commit Lint'
        id: semver
        uses: "cdotyone/github-next-version@main"
```
[bignote]

[bignote]: Here's one with multiple paragraphs and code.
