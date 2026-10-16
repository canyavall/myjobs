# myJobs

Every job from 800+ company career sites, scored against your own skills, on your machine.

myJobs reads employers' own job pages and the job boards you pick, puts every posting in
one list, and ranks it by the skills you have and the skills you want to use. It is one
file that runs on your computer. There is no account, nothing to sign up for, and no
telemetry.

## What it does

- **Jobs:** one list from every source. A vacancy posted on the company site and on two
  boards shows up once, with the other places to apply under it. Narrow it by profession,
  field, skill, country, work type, workload and posting date. Rules drop postings that
  contain a word you name.
- **Scoring:** each posting is read for the skills it asks for. You give every skill two
  numbers from 0 to 10, *My expertise* and *Goal importance*, and every posting gets two
  scores from them: fit and goal. It is plain arithmetic, not a model, so the same
  postings and the same profile always give the same list.
- **ATS check:** reads your actual CV file (Word, PDF or Markdown) against a posting and
  shows which of its skills your CV mentions. It also checks whether the job title appears
  and runs the file checks that resume parsers document.
- **Markets:** every posting ever pulled is kept with the day it appeared and the day it
  closed. This shows volume over time, skills in demand, who is hiring, how long roles stay
  open and published salaries.
- **Applied:** a timeline of your applications, with a frozen copy of the CV and cover
  letter you sent. If you connect your mailbox, replies are matched to the applications
  they answer.
- **Companies:** ratings and facts from public sources (kununu, Glassdoor, Wikidata,
  GitHub, Great Place to Work), each labelled with where it came from.

## Download

Get the binary for your system from [Releases](https://github.com/canyavall/myjobs/releases):

| Platform | File |
|---|---|
| Windows (x64) | `myjobs-windows-x64.exe` |
| macOS (Apple silicon) | `myjobs-darwin-arm64` |
| macOS (Intel) | `myjobs-darwin-x64` |
| Linux (x64) | `myjobs-linux-x64` |

Put it in an empty folder of its own and run it. It creates its data next to itself and
opens the dashboard. The binaries are not code-signed yet, so the first launch shows a
warning:

- **Windows:** SmartScreen says "Windows protected your PC". Click *More info*, then *Run anyway*.
- **macOS:** `chmod +x myjobs-darwin-arm64 && xattr -d com.apple.quarantine myjobs-darwin-arm64`,
  then run it. Or, in Finder, right-click the file and choose *Open*.
- **Linux:** `chmod +x myjobs-linux-x64 && ./myjobs-linux-x64`

After that, myJobs checks for updates itself and offers new versions in its notification
bell. It never installs one without asking.

## Your data stays on your computer

Everything myJobs creates goes in the folder you put it in: your profile, CVs, applications
and the postings it pulled. Back it up, move it or delete it.

It connects to:
- **career sites and job boards**, to fetch postings when you press Sync. Your profile is
  never sent; scoring happens after the download.
- **this repo**, once a day, to check for updates. Newer company lists and skill
  vocabulary arrive automatically, signed and verified. A new app version is downloaded
  only when you click *Install*.
- **your own mailbox**, only if you set it up.
- **public company sources**, only when you add a company or refresh its facts.
- **GitHub**, only when you press *Share with myJobs* or *Report this problem* on a
  company. That opens an issue in your own browser holding the company's public details
  or the error your Sync got, plus the app version - never your profile, CV or anything
  about you. You read it and press *Create*; nothing is sent without that click.

## What is in this repo

| Path | What it is |
|---|---|
| `data/` | The data every install shares: the company list and how to pull each one, job boards, the profession and field vocabulary, the skill dictionary, places and cities. |
| `site/` | The website. |
| `manifest/` | The signed version file installs read to find updates, created by the first release. |

The app's source code is not in this repo.

## Contributing

The company list and the skill dictionary are shared by everyone who uses myJobs. A
missing employer, a broken connector, or a skill the dictionary cannot recognise is
worth an [issue](https://github.com/canyavall/myjobs/issues). Pull requests against
`data/` are welcome too. Once merged, the daily data release bumps the file's `version`
and every install picks it up.

The quickest way is from the app: open a company you added or edited, or one whose Sync
failed, and press **Share with myJobs** or **Report this problem**. It opens a prefilled
issue (a free GitHub account is needed). A check then runs on its own: a shared company has
to return real job postings, and a fake token in its place has to return none. If it
passes, a pull request is opened for review. A reported connector is run again here, so a
broken one can be told apart from a problem on one machine.
