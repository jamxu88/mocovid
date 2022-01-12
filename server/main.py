import pandas as pd
import numpy as np
import os
import json

def getdata(school, metric, data):
    info = [(df.loc[df["School"] == school, metric].iloc[0])
         if len(df.loc[df["School"] == school, metric]) > 0
         else 0
         for df in data]
    return sum(info)

population = {'A. Mario Loiederman Middle Sch': 1059, 'Albert Einstein High School': 2127, 'Alternative Ed': 121, 'Arcola Elementary School': 726, 'Argyle Middle School': 1084, 'Ashburton Elementary School': 939, 'Bannockburn Elementary School': 469, 'Bayard Rustin Elementary Schl': 823, 'Beall Elementary School': 562, 'Bel Pre Elementary School': 627, 'Bells Mill Elementary School': 647, 'Belmont Elementary School': 384, 'Benjamin Banneker Middle Schl': 964, 'Bethesda Elementary School': 732, 'Bethesda-Chevy Chase High Schl': 2530, 'Beverly Farms Elementary Schl': 612, 'Bradley Hills Elementary Schl': 533, 'Briggs Chaney Middle School': 1064, 'Brooke Grove Elementary School': 519, 'Brookhaven Elementary School': 463, 'Brown Station Elementary Schl': 676, 'Burning Tree Elementary School': 476, 'Burnt Mills Elementary School': 705, 'Burtonsville Elementary School': 677, 'Cabin John Middle School': 1155, 'Candlewood Elementary School': 420, 'Cannon Road Elementary School': 464, 'Capt. James Daly Elementary': 613, 'Carderock Springs Elem School': 378, 'Carl Sandburg Learning Center': 158, 'Cashell Elementary School': 376, 'Cedar Grove Elementary School': 449, 'Chevy Chase Elementary School': 509, 'Clarksburg Elementary School': 856, 'Clarksburg High School': 2546, 'Clearspring Elementary School': 635, 'Clopper Mill Elementary School': 520, 'Cloverly Elementary School': 473, 'Col. Zadok Magruder High Schl': 1797, 'Cold Spring Elementary School': 370, 'College Gardens Elem School': 594, 'Cresthaven Elementary School': 547, 'Damascus Elementary School': 417, 'Damascus High School': 1533, 'Darnestown Elementary School': 377, 'Diamond Elementary School': 815, 'Dr. Charles Drew Elem School': 561, 'Dr. Martin Luther King, Jr. MS': 1002, 'Dr. Sally K. Ride Elem School': 565, 'DuFief Elementary School': 324, 'Earle B. Wood Middle School': 1174, 'East Silver Spring Elem School': 547, 'Eastern Middle School': 1052, 'Fairland Elementary School': 635, 'Fallsmead Elementary School': 587, 'Farmland Elementary School': 888, 'Fields Road Elementary School': 543, 'Flora M. Singer Elem School': 733, 'Flower Hill Elementary School': 509, 'Flower Valley Elem School': 583, 'Forest Knolls Elem School': 551, 'Forest Oak Middle School': 1048, 'Fox Chapel Elementary School': 651, 'Francis Scott Key Middle Schl': 1098, 'Gaithersburg Elementary School': 902, 'Gaithersburg High School': 2615, 'Gaithersburg Middle School': 1014, 'Galway Elementary School': 824, 'Garrett Park Elementary School': 762, 'Georgian Forest Elem School': 647, 'Germantown Elementary School': 356, 'Glen Haven Elementary School': 569, 'Glenallan Elementary School': 778, 'Goshen Elementary School': 568, 'Great Seneca Creek Elem School': 607, 'Greencastle Elementary School': 771, 'Greenwood Elementary School': 596, 'Hallie Wells Middle Sch': 1086, 'Harmony Hills Elem School': 794, 'Herbert Hoover Middle School': 1114, 'Highland Elementary School': 615, 'Highland View Elem School': 415, 'Jackson Road Elem School': 745, 'James Hubert Blake High School': 1946, 'JoAnn Leleck ES at Broad Acres': 905, 'John F. Kennedy High School': 2020, 'John Poole Middle School': 482, 'John T. Baker Middle School': 934, 'Jones Lane Elementary School': 473, 'Judith A. Resnik Elem School': 660, 'Julius West Middle School': 1502, 'Kemp Mill Elementary School': 496, 'Kensington-Parkwood Elem Schl': 668, 'Kingsview Middle School': 1105, 'Lake Seneca Elementary School': 538, 'Lakelands Park Middle School': 1214, 'Lakewood Elementary School': 480, 'Laytonsville Elementary School': 408, 'Little Bennett Elementary Schl': 733, 'Lois P. Rockwell Elementary': 514, 'Longview': 119, 'Lucy V. Barnsley Elementary': 778, 'Luxmanor Elementary School': 730, 'Maryvale Elementary School': 715, 'Meadow Hall Elementary School': 459, 'Mill Creek Towne Elem School': 551, 'Monocacy Elementary School': 187, 'Montgomery Blair High School': 3501, 'Montgomery Knolls Elem School': 554, 'Montgomery Village Middle Schl': 882, 'Neelsville Middle School': 908, 'New Hampshire Estates ES': 520, 'Newport Mill Middle School': 737, 'North Bethesda Middle School': 1270, 'North Chevy Chase Elem School': 260, 'Northwest High School': 2773, 'Northwood High School': 2046, 'Oak View Elementary School': 464, 'Oakland Terrace Elem School': 546, 'Odessa Shannon Middle Schl': 878, 'Olney Elementary School': 680, 'Paint Branch High School': 2292, 'Parkland Middle School': 1277, 'Pine Crest Elementary School': 526, 'Piney Branch Elementary School': 682, 'Poolesville Elementary School': 595, 'Poolesville High School': 1382, 'Potomac Elementary School': 463, 'Quince Orchard High School': 2320, 'Rachel Carson Elem School': 768, 'Redland Middle School': 688, 'RICA - Reg Inst for Child/Adol': 152, 'Richard Montgomery High School': 2583, 'Ridgeview Middle School': 876, 'Ritchie Park Elementary School': 420, 'Robert Frost Middle School': 1088, 'Roberto Clemente Middle School': 1061, 'Rock Creek Forest Elementary': 795, 'Rock Creek Valley Elem School': 434, 'Rock Terrace School': 143, 'Rock View Elementary School': 713, 'Rockville High School': 1613, 'Rocky Hill Middle School': 1116, 'Rolling Terrace Elem School': 852, 'Ronald McNair Elem': 861, 'Rosa M. Parks Middle School': 929, 'Roscoe R. Nix Elementary': 556, 'Rosemary Hills Elem School': 610, 'Rosemont Elementary School': 692, 'S. Christa McAuliffe ES': 600, 'Sargent Shriver Elem School': 849, 'Seneca Valley High School': 2243, 'Sequoyah Elementary School': 413, 'Seven Locks Elementary School': 433, 'Shady Grove Middle School': 614, 'Sherwood Elementary School': 551, 'Sherwood High School': 1966, 'Silver Creek Middle School': 891, 'Silver Spring International MS': 1289, 'Sligo Creek Elementary School': 716, 'Sligo Middle School': 823, 'Snowden Farm ES': 822, 'Somerset Elementary School': 497, 'South Lake Elementary School': 927, 'Spark M. Matsunaga Elem School': 679, 'Springbrook High School': 1902, 'Stedwick Elementary School': 594, 'Stephen Knolls School': 89, 'Stone Mill Elementary School': 569, 'Stonegate Elementary School': 555, 'Strathmore Elementary School': 553, 'Strawberry Knoll Elem School': 669, 'Summit Hall Elementary School': 809, 'Takoma Park Elementary School': 624, 'Takoma Park Middle School': 1247, 'Thomas S. Wootton High School': 2132, 'Thomas W. Pyle Middle School': 1454, 'Thurgood Marshall Elem School': 589, 'Tilden Middle School': 1146, 'Travilah Elementary School': 401, 'Twinbrook Elementary School': 602, 'Viers Mill Elementary School': 549, 'Walt Whitman High School': 2213, 'Walter Johnson High School': 3139, 'Washington Grove Elem School': 498, 'Waters Landing Elementary Schl': 825, 'Watkins Mill Elementary School': 898, 'Watkins Mill High School': 1802, 'Wayside Elementary School': 502, 'Weller Road Elementary School': 826, 'Westbrook Elementary School': 335, 'Westland Middle School': 897, 'Westover Elementary School': 318, 'Wheaton High School': 2666, 'Wheaton Woods Elementary Schl': 612, 'Whetstone Elementary School': 768, 'White Oak Middle School': 938, 'William B. Gibbs, Jr. ES': 556, 'William H. Farquhar Middle Sch': 738, 'William Tyler Page ES': 703, 'Wilson Wims Elementary School': 657, 'Winston Churchill High School': 2459, 'Wood Acres Elementary School': 582, 'Woodfield Elementary School': 363, 'Woodlin Elementary School': 619, 'Wyngate Elementary School': 773}
schools = ['A. Mario Loiederman Middle Sch', 'Albert Einstein High School', 'Alternative Ed', 'Arcola Elementary School', 'Argyle Middle School', 'Ashburton Elementary School', 'Bannockburn Elementary School', 'Bayard Rustin Elementary Schl', 'Beall Elementary School', 'Bel Pre Elementary School', 'Bells Mill Elementary School', 'Belmont Elementary School', 'Benjamin Banneker Middle Schl', 'Bethesda Elementary School', 'Bethesda-Chevy Chase High Schl', 'Beverly Farms Elementary Schl', 'Bradley Hills Elementary Schl', 'Briggs Chaney Middle School', 'Brooke Grove Elementary School', 'Brookhaven Elementary School', 'Brown Station Elementary Schl', 'Burning Tree Elementary School', 'Burnt Mills Elementary School', 'Burtonsville Elementary School', 'Cabin John Middle School', 'Candlewood Elementary School', 'Cannon Road Elementary School', 'Capt. James Daly Elementary', 'Carderock Springs Elem School', 'Carl Sandburg Learning Center', 'Cashell Elementary School', 'Cedar Grove Elementary School', 'Chevy Chase Elementary School', 'Clarksburg Elementary School', 'Clarksburg High School', 'Clearspring Elementary School', 'Clopper Mill Elementary School', 'Cloverly Elementary School', 'Col. Zadok Magruder High Schl', 'Cold Spring Elementary School', 'College Gardens Elem School', 'Cresthaven Elementary School', 'Damascus Elementary School', 'Damascus High School', 'Darnestown Elementary School', 'Diamond Elementary School', 'Dr. Charles Drew Elem School', 'Dr. Martin Luther King, Jr. MS', 'Dr. Sally K. Ride Elem School', 'DuFief Elementary School', 'Earle B. Wood Middle School', 'East Silver Spring Elem School', 'Eastern Middle School', 'Fairland Elementary School', 'Fallsmead Elementary School', 'Farmland Elementary School', 'Fields Road Elementary School', 'Flora M. Singer Elem School', 'Flower Hill Elementary School', 'Flower Valley Elem School', 'Forest Knolls Elem School', 'Forest Oak Middle School', 'Fox Chapel Elementary School', 'Francis Scott Key Middle Schl', 'Gaithersburg Elementary School', 'Gaithersburg High School', 'Gaithersburg Middle School', 'Galway Elementary School', 'Garrett Park Elementary School', 'Georgian Forest Elem School', 'Germantown Elementary School', 'Glen Haven Elementary School', 'Glenallan Elementary School', 'Goshen Elementary School', 'Great Seneca Creek Elem School', 'Greencastle Elementary School', 'Greenwood Elementary School', 'Hallie Wells Middle Sch', 'Harmony Hills Elem School', 'Herbert Hoover Middle School', 'Highland Elementary School', 'Highland View Elem School', 'Jackson Road Elem School', 'James Hubert Blake High School', 'JoAnn Leleck ES at Broad Acres', 'John F. Kennedy High School', 'John Poole Middle School', 'John T. Baker Middle School', 'Jones Lane Elementary School', 'Judith A. Resnik Elem School', 'Julius West Middle School', 'Kemp Mill Elementary School', 'Kensington-Parkwood Elem Schl', 'Kingsview Middle School', 'Lake Seneca Elementary School', 'Lakelands Park Middle School', 'Lakewood Elementary School', 'Laytonsville Elementary School', 'Little Bennett Elementary Schl', 'Lois P. Rockwell Elementary', 'Longview', 'Lucy V. Barnsley Elementary', 'Luxmanor Elementary School', 'Maryvale Elementary School', 'Meadow Hall Elementary School', 'Mill Creek Towne Elem School', 'Monocacy Elementary School', 'Montgomery Blair High School', 'Montgomery Knolls Elem School', 'Montgomery Village Middle Schl', 'Neelsville Middle School', 'New Hampshire Estates ES', 'Newport Mill Middle School', 'North Bethesda Middle School', 'North Chevy Chase Elem School', 'Northwest High School', 'Northwood High School', 'Oak View Elementary School', 'Oakland Terrace Elem School', 'Odessa Shannon Middle Schl', 'Olney Elementary School', 'Paint Branch High School', 'Parkland Middle School', 'Pine Crest Elementary School', 'Piney Branch Elementary School', 'Poolesville Elementary School', 'Poolesville High School', 'Potomac Elementary School', 'Quince Orchard High School', 'Rachel Carson Elem School', 'Redland Middle School', 'RICA - Reg Inst for Child/Adol', 'Richard Montgomery High School', 'Ridgeview Middle School', 'Ritchie Park Elementary School', 'Robert Frost Middle School', 'Roberto Clemente Middle School', 'Rock Creek Forest Elementary', 'Rock Creek Valley Elem School', 'Rock Terrace School', 'Rock View Elementary School', 'Rockville High School', 'Rocky Hill Middle School', 'Rolling Terrace Elem School', 'Ronald McNair Elem', 'Rosa M. Parks Middle School', 'Roscoe R. Nix Elementary', 'Rosemary Hills Elem School', 'Rosemont Elementary School', 'S. Christa McAuliffe ES', 'Sargent Shriver Elem School', 'Seneca Valley High School', 'Sequoyah Elementary School', 'Seven Locks Elementary School', 'Shady Grove Middle School', 'Sherwood Elementary School', 'Sherwood High School', 'Silver Creek Middle School', 'Silver Spring International MS', 'Sligo Creek Elementary School', 'Sligo Middle School', 'Snowden Farm ES', 'Somerset Elementary School', 'South Lake Elementary School', 'Spark M. Matsunaga Elem School', 'Springbrook High School', 'Stedwick Elementary School', 'Stephen Knolls School', 'Stone Mill Elementary School', 'Stonegate Elementary School', 'Strathmore Elementary School', 'Strawberry Knoll Elem School', 'Summit Hall Elementary School', 'Takoma Park Elementary School', 'Takoma Park Middle School', 'Thomas S. Wootton High School', 'Thomas W. Pyle Middle School', 'Thurgood Marshall Elem School', 'Tilden Middle School', 'Travilah Elementary School', 'Twinbrook Elementary School', 'Viers Mill Elementary School', 'Walt Whitman High School', 'Walter Johnson High School', 'Washington Grove Elem School', 'Waters Landing Elementary Schl', 'Watkins Mill Elementary School', 'Watkins Mill High School', 'Wayside Elementary School', 'Weller Road Elementary School', 'Westbrook Elementary School', 'Westland Middle School', 'Westover Elementary School', 'Wheaton High School', 'Wheaton Woods Elementary Schl', 'Whetstone Elementary School', 'White Oak Middle School', 'William B. Gibbs, Jr. ES', 'William H. Farquhar Middle Sch', 'William Tyler Page ES', 'Wilson Wims Elementary School', 'Winston Churchill High School', 'Wood Acres Elementary School', 'Woodfield Elementary School', 'Woodlin Elementary School', 'Wyngate Elementary School']
popvalues = list(population.values())

directory = ("data")
dashboarddata = []
dashboarddata10days = []
days = sorted(os.listdir(directory))[::-1][:10] #taking first 10 days for dashboard
for filename in days:
    if filename.endswith(".xlsx"):
        df = pd.read_excel(f"{directory}/{filename}")
        df.columns = ["School", "Staff", "Student", "Grand Total"]
        dashboarddata10days.append(df)
    else:
        continue

alldays = sorted(os.listdir(directory))[::-1]
for filename in alldays:
    if filename.endswith(".xlsx"):
        df = pd.read_excel(f"{directory}/{filename}")
        df.columns = ["School", "Staff", "Student", "Grand Total"]
        dashboarddata.append(df)
    else:
        continue

dashboarddata10day = [df[~df["Grand Total"].isnull()].replace(np.nan, 0) for df in dashboarddata]
dashboarddata = [df[~df["Grand Total"].isnull()].replace(np.nan, 0) for df in dashboarddata]

staffdata10 = [getdata(school, "Staff", dashboarddata10day) for school in schools]
studentdata10 = [getdata(school, "Student", dashboarddata10day) for school in schools]
grandtotaldata10 = [getdata(school, "Grand Total", dashboarddata10day) for school in schools]

staffdata = [getdata(school, "Staff", dashboarddata) for school in schools]
studentdata = [getdata(school, "Student", dashboarddata) for school in schools]
grandtotaldata = [getdata(school, "Grand Total", dashboarddata) for school in schools]

avgstaffdata10 = [data/len(days) for data in staffdata10]
avgstudentdata10 = [data/len(days) for data in studentdata10]
avggrandtotaldata10 = [data/len(days) for data in grandtotaldata10]

avgstaffdata = [data/len(alldays) for data in staffdata10]
avgstudentdata = [data/len(alldays) for data in studentdata10]
avggrandtotaldata = [data/len(alldays) for data in grandtotaldata10]

activecasespercentage = []
for caseindex in range(len(grandtotaldata10)):
    activecasespercentage.append("{:.2%}".format(grandtotaldata10[caseindex]/ popvalues[caseindex]))

covidf = pd.DataFrame(
    {
     "school": schools,
     "population": popvalues,
     "staff_cases_over_10_days": staffdata10,
     "avg_staff_cases_over_10_days": avgstaffdata10,
     "staff_cases_total": staffdata,
     "avg_staff_cases_per_day": avgstaffdata,
     "student_cases_over_10_days": studentdata10,
     "avg_student_cases_over_10_days": avgstudentdata10,
     "student_cases_total": studentdata,
     "avg_student_cases_per_day": avgstudentdata,
     "active_cases_over_10_days": grandtotaldata10,
     "avg_total_over_10_days": avggrandtotaldata10,
     "active_percentages": activecasespercentage,
     "total_cases": grandtotaldata,
     "avg_total_cases_per_day": avggrandtotaldata,
    }
)

result = covidf.to_json(orient="records")
parsed = json.loads(result)
with open('dashboard.json', "w") as outputfile:
    outputfile.write(json.dumps(parsed, indent=4))





