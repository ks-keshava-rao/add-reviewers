# @ks-keshava-rao/add-reviewers

Github action to add reviewer(s) to the pull request .

This action will  operate  with labeled events in pull requests. Whenever a label is added to a pull request, such as the 'open-for-review' label, this action will automatically trigger. It works by adding the designated reviewer(s) specified in the workflow configuration.

## Example workflow

- Create a file `add-reviewers.yml` in `.github/workflows/` directory with the following content:

```yaml
name: Auto assign reviewers on labeled action
on: 
    pull_request:
        types:
          - labeled
jobs:
    add-reviewers-on-label:
        if: contains(github.event.pull_request.labels.*.name,'Open-for-review')
        runs-on : ubuntu-latest
        steps :
            - name: Assign reviewers
              uses: ks-keshava-rao/add-reviewers@v1
              with:
                 reviewers: reviewer1,reviewer2,reviewer3
                 token: "${{ secrets.GITHUB_TOKEN }}"
                 debugMode: true
              id: assign_reviewers
```
## Inputs

| Name | Description | Example | Required |
| --- | --- | --- |
| `token` | Automatically generated and repo scoped token | ${{ secrets.GITHUB_TOKEN }} | Yes |
| `reviewers` | Reveiwers github id(s) separated by comma | user1,user2,user3 | Yes |
| `debugMode` | Print the logs for development purpose| `true` or `false` |  No |

### Action Result
The action will fail the workflow in case the username of the reviewer(s) are invalid or incorrect 
