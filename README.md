# Montgomery County Public Schools COVID-19 Visualizer
[![Netlify Status](https://api.netlify.com/api/v1/badges/b4ce8447-27c7-4821-9ef7-0f050f96ddca/deploy-status)](https://app.netlify.com/sites/stupefied-kare-2bdf07/deploys)
## Contents
- [About this project](https://github.com/jamxu88/mocovid/blob/main/README.md#about-this-project)
- [Data](https://github.com/jamxu88/mocovid/blob/main/README.md#data)
- [Support this project](https://github.com/jamxu88/mocovid/blob/main/README.md#support-this-project)

### About this project
Montgomery County Public Schools has not been very transparent about the COVID data in schools. Since the massive spike in cases, the previous 5% guideline has been removed. Students, staff, and parents all need to guess how many COVID cases there are, and use the little data they have to push for change. In creating this project, we have aggregated all the public data we can to create a COVID dashboard that is accurate, up to date, and contains extra analysis and other useful information.
<br>
The official COVID dashboard found on the MCPS website is outdate and inaccurate, obviously not maintained and is hard to interpret with not a lot of information.

### Data
All data we use can be found in the `server` directory of this repo. Anyone is free to use this data in their own projects. It is all sourced and parsed directly from the reports found on the MCPS Covid dashboard, updated once a day.

We have 3 publicly available JSONs available for anyone to use! The files are all located in `server` and links along with formats can be found below.

![Dashboard Data](https://raw.githubusercontent.com/jamxu88/mocovid/main/server/schooldateinfo.json)
```
{
  {
        "school": "Poolesville High School",
        "population": 1382,
        "staff_cases_over_5_days": 1,
        "avg_staff_cases_over_5_days": 0.2,
        "staff_cases_total": 8,
        "avg_staff_cases_per_day": 0.6153846154,
        "student_cases_over_10_days": 43,
        "avg_student_cases_over_10_days": 4.3,
        "student_cases_total": 67,
        "avg_student_cases_per_day": 5.1538461538,
        "active_cases": 44,
        "active_cases_over_10_days": 4.4,
        "active_percentages": "3.18%",
        "total_cases": 75,
        "avg_total_cases_per_day": 5.7692307692
    },
```

![Each date's data](https://raw.githubusercontent.com/jamxu88/mocovid/main/server/dateinfo.json)
```
{
    "2022-01-17": [
        {
            "School": "A. Mario Loiederman Middle Sch",
            "Staff": 0,
            "Student": 1,
            "Grand Total": 1
        },
        {
            "School": "Albert Einstein High School",
            "Staff": 1,
            "Student": 4,
            "Grand Total": 5
        },
        ...
   }, ...
}
```

![School Data](https://raw.githubusercontent.com/jamxu88/mocovid/main/server/schooldateinfo.json)
```
{
  "Poolesville High School": {
        "2022-01-05": {
            "Staff": 1,
            "Student": 8,
            "Grand Total": 9,
            "Active Cases": 9
        },
        "2022-01-06": {
            "Staff": 0,
            "Student": 9,
            "Grand Total": 9,
            "Active Cases": 18
        },
        ...
  }, ...
}
```

<br>
<br>
We know that data is important, and therefore it must be accurate. If there are any percieved issues with the data or inaccuracies to fix, feel free to create an issue and we will address it.
### Support this project
