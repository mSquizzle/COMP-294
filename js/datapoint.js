// Our datasets
var bankruptcies = {
	"2009":1412838,
    "2010":1536799,
	"2011":1362847,
    "2012":1181016,
    "2013":1038720,
    "2014":909812,
    "2015":819760,
    "2016":770846 
};

var allAgeUninsured = {
	"2006": 14.8,
    "2007": 14.5,
    "2008": 14.7,
    "2009": 15.4,
    "2010": 16.0,
    "2011": 15.1,
    "2012": 14.7,
    "2013": 14.4,
    "2014": 11.5,
    "2015": 9.1,
    "2016": 9.0,
    "2017": 8.8
};

var underSixtyFiveUninsured = {
	"2006": 16.8,
    "2007": 16.4,
    "2008": 16.7,
    "2009": 17.5,
    "2010": 18.2,
    "2011": 17.3,
    "2012": 16.9,
    "2013": 16.6,
    "2014": 13.3,
    "2015": 10.5,
    "2016": 10.4,
    "2017": 10.3
};

var adultUninsured = {
	"2006": 19.8,
    "2007": 19.4,
    "2008": 19.7,
    "2009": 21.1,
    "2010": 22.3,
    "2011": 21.3,
    "2012": 20.9,
    "2013": 20.4,
    "2014": 16.3,
    "2015": 12.8,
    "2016": 12.4,
    "2017": 12.1,
};

var underEighteenUninsured = {
	"2006": 9.3,
    "2007": 8.9,
    "2008": 8.9,
    "2009": 8.2,
    "2010": 7.8,
    "2011": 7.0,
    "2012": 6.6,
    "2013": 6.5,
    "2014": 5.5,
    "2015": 4.5,
    "2016": 5.1,
    "2017": 5.3
};

var skippedCare = {
	"2006": 5.8,
    "2007": 5.8,
    "2008": 6.5,
    "2009": 6.9,
    "2010": 6.9,
    "2011": 6.5,
    "2012": 6.2,
    "2013": 5.9,
    "2014": 5.3,
    "2015": 4.5,
    "2016": 4.4,
    "2017": 4.3
};

var unemployed = {
	"2006": 4.4,
    "2007": 5.0,
    "2008": 7.3,
    "2009": 9.9,
    "2010": 9.3,
    "2011": 8.5,
    "2012": 7.9,
    "2013": 6.7,
    "2014": 5.6,
    "2015": 5.0,
    "2016": 4.7,
    "2017": 4.1
};

var firstChartTitles = {
	"0" : "Uninsured Americans - All Ages",
	"1" : "Uninsured Americans Under 65",
	"2" : "Uninsured Americans 18-64",
	"3" : "Uninsured Americans Under 18",
	"4" : "Americans Who Did Not Seek Medical Care Due To Cost",
	"5" : "Unemployment Rate"
};

var visibleCharts = {
	"0" : true,
	"1" : false,
	"2" : false,
	"3" : false,
	"4" : true,
	"5" : true
};

var keyLabels = {
	"0" : "Percentage of Uninsured Americans",
	"1" : "Under 65",
	"2" : "18-64",
	"3" : "Under 18",
	"4" : "Percentage of Americans that Skipped <br/>Treatment Due to Medical Costs",
	"5" : "US Unemployment Rate"
};

var keyToolTips = {
	"0" : "  A person was defined as uninsured if he or she did not have any private health insurance, Medicare, Medicaid, Children’s Health Insurance Program, state–sponsored or other government–sponsored health plan, or military plan at the time of interview. A person was also defined as uninsured if he or she had only Indian Health Service coverage or had only a private plan that paid for one type of service, such as accidents or dental care.",
	"1" : "  A person was defined as uninsured if he or she did not have any private health insurance, Medicare, Medicaid, Children’s Health Insurance Program, state–sponsored or other government–sponsored health plan, or military plan at the time of interview. A person was also defined as uninsured if he or she had only Indian Health Service coverage or had only a private plan that paid for one type of service, such as accidents or dental care.",
	"2" : "  A person was defined as uninsured if he or she did not have any private health insurance, Medicare, Medicaid, Children’s Health Insurance Program, state–sponsored or other government–sponsored health plan, or military plan at the time of interview. A person was also defined as uninsured if he or she had only Indian Health Service coverage or had only a private plan that paid for one type of service, such as accidents or dental care.",
	"3" : "  A person was defined as uninsured if he or she did not have any private health insurance, Medicare, Medicaid, Children’s Health Insurance Program, state–sponsored or other government–sponsored health plan, or military plan at the time of interview. A person was also defined as uninsured if he or she had only Indian Health Service coverage or had only a private plan that paid for one type of service, such as accidents or dental care.",
	"4" : "    Percentage of persons of all ages who failed to obatin needed edical care due to the cost at some time during the past 12 months.",
	"5" : "    A person who is jobless, looking for a job, and available for work is unemployed. The unemployment rate is the total number of enemployed individuals divded by the total number of persons in thet workforce (those who are either working or looking for a job)."	
}

var firstChartGroup = [
	allAgeUninsured,
	underSixtyFiveUninsured,
	adultUninsured,
	underEighteenUninsured,
	skippedCare,
	unemployed
];

var secondChartGroup = [
	bankruptcies
];


var firstChartNarration = [
	"<p>Here we have the following statistics:</p>"
      +"<p>- the percentange of uninsured Americans</p>"
      +"<p>- the percentage of Americans who failed to obtain needed medical care due to cost</p>"
      +"<p>In addition, we have also included the unemployment rate, since over 70% of Americans receive private insurance, which is usually obtained through their employer.</p>"
      +"<p>We chose to start our timeline around 2006 in order to give a good idea of what these statistics looked like prior to the ACA.</p>"
      +"<p>As you scroll through, feel free to interact with the chart above to turn on/off any of the statistics.</p>",
	  "<p>2007</p>"
      +"<p>As we enter 2007, remember that we are coming to the end of the second term of George W. Bush's presidency.</p>"
      +"<p>Tensions are high.</p>"
      +"<p>We are still in midst of the Iraq War.</p>"
      +"<p>We are also in the middle of a recession, watching the unemployment rate rapidly rise...</p>"
      +"<p>and of course, presidential campaigns are now becoming the sole focus of the news cycle.</p>",
	"<p>2008</p>"
      +"<p>Senators Barack Obama and John McCain with the nominations from their respective parties.</p>"
      +"<p>As they engage in debates, major topics include the war, the enonomy and health care.</p>"
      +"<p>Both candidates present different visions for health care.</p>"
      +"<p>McCain opts for a plan to make heath care more affordable.</p>"
      +"<p>Obama's plan focuses on making health care more accessible.</p>"
      +"<p>After a long campaign, Obama secures the presidency in November.</p>",
	"<p>2009\n\n"
      +"<p>March - President Obama partakes in a health summit, meeting with law-makers and individuals from different parts of the health care system,\n like doctors, insurers and drug companies.</p>"
      +"<p>July - House Democrats reveal a 1000-page plan for revamping the existing health care system.</p>"
      +"<p>August - Sarah Palin posts on Facebook about Obama's \"death panels\", urging supporters to fight against the proposed healthcare bill.</p>"
      +"<p>This becomes Politifact's 'Lie of the Year' for 2009.</p>"
      +"<p>Democratic Massachusetts Senator Ted Kennedy dies.</p>"
      +"<p>November - The House passes its version of health care reform with a 220-215 vote.</p>"
      +"<p>December - The Senate approves its version of the bill with a 60-39 vote, which is entirely along party lines.</p>", 
	  "<p>2010</p>"
    +"<p>January - In an upset, Republican Scott Brown wins the special election for Ted Kennedy's Senate Seat.</p>"
    +"<p>He had campaigned against the health care reform.</p>"
    +"<p>March - President Obama signs the ACA into law (titled \"The Patiend Protection and Affordable Care Act\".</p>"+
      "<p>June - The first major provision is put into effect: </p>"+
      "<p>- Adults with existing conditions are now able to sign up for insurance. </p>"+
      "<p>(they will have to re-enroll later in an ACA compliant plan)</p>"+
      "<p>September 2010 - Additional provisions go into effect:</p>"
      +"<p>- No lifetime dollar limits on health care coverage</p>"
      +"<p>- Dependent children may stay on their parents' insurance until the age of 26</p>"
      +"<p>- Ban on denial of coverage due to pre-existing conditions extended to those under 19.</p>"
      +"<p>- Insurers may no longer require copays for vaccines and preventive care.</p>",
	"<p>2011</p>"
      +"<p>January - A Florida judge Roger Vinson declares that elements of the ACA are unconstitutional.</p>"
      +"<p>September - Health insurers are required to go public with rates increases of 10 percent or more.</p>"
      +"<p>November - The Supreme Court of the United Sates hears arguments that major elements of the ACA are unconsitutional.</p>",
	"<p>2012</p>"
      +"<p>June - The Supreme Court issues their ruling, upholding major provisions of the ACA.</p>"
      +"<p>Republican presidential nominee Mitt Romney vocally disagrees with the decision and the ACA as a whole.</p>"
      +"<p>Interestingly enough, Mitt Romney was the governer of Massachusetts when it passed its own health care reform requiring individual mandates.</p>"
      +"<p>This is colloquially known as Romneycare, much in the same way that the ACA has been dubbed Obamacare.</p>"
      +"<p>November - Obama wins reelection over Romney with substantial margins.</p>"
      +"<p>This ensures the ACA's existence until 2016</p>",
	"<p>2013</p>"
      +"<p>January - Limit on pretax contributions to flex spending accounts capped at $2,500 annually.</p>"
      +"<p>July - The White House agrees to delay the provision that large businesses must provide afforable health care to full-time employees by one year.</p>"
      +"<p>October - Healthcare.gov rolls out, marking open enrollment for the new health exchanges. </p>"
      +"<p>The event is somewhat mired by technological difficulties, making it difficult for people to enroll.</p>" 
      +"<p>December - the majority of infrastructure issues ailing healthcare.gov have been resolved.</p>",
	"<p>2014</p>"
      +"<p>January - Most of the ACA's major provisions are enacted. These include:</p>"
      +"<p>- Opening of state health care exchanges</p>"
      +"<p>- Requirement of large employers to provide affordable coverage to employees who work more than 30 hours per week.</p>"
      +"<p>- Ban on denial of coverage to adults with pre-existing condtions</p>"
      +"<p>- Individuals who enrolled in a plan after March 23rd, 2010 must re-enroll in an ACA-compliant plan</p>"
      +"<p>- Individuals who enrolled prior to March 23rd, 2010 may keep their plan as long as it is offered</p>",
	"<p>2015</p>"
      +"<p>This is a relatively quiet year for the ACA.</p>"
      +"<p></p>"
      +"<p>Most of the news at this point is focusing on what will become a complete circus of a presidential election.</p>",
	"<p>2016</p>"
      +"<p>November - Donald Trump is elected president. One of his most highly touted campaign promises includes the replacement and repeal of the ACA.</p>"
      +"<p>He alleges that this will be done 'out of the gate' and that his repeal and replacement plans for the ACA will be simultaneous.</p>"
      +"<p>With the Republican Party in control of both the House and the Senate, it seemed as if the ACA's end was immeninent.</p>"
      +"<p>Yet somehow, things do not go according to plan.</p>"
      +"<p>House Republicans have tried and failed multiple times to pass any new legistlation that would repeal the ACA.</p>"
      +"<p>We are at tail-end of open enrollment for 2017, which means that the ACA lives to fight for at least one more year.</p>"   
]

var secondChartNarration = [
	"<p>Another metric that be used to view the impact of the ACA is the number of bankrupcties filed where medical bills were the primary cause. Like the other metrics, there is no one single factor influencing why this statistic has seen a decrease in recent years.</p>"
    +"<p>However, insurance plays a huge role in reducing the cost of most medical expenses. By expanding health coverage access, the number of individuals who are paying completely out of pocket for medical expenses like doctors visits, prescription medication, and operations, are reduced. Since the ACA was signed, the number of these types of bankruptcies have been almost cut in half.</p>"
    +"<p>So why has the ACA had such a mixed approval rating?</p>"
    +"<p>For one, many people simply object to the idea of the federal government's increased involvement in the health care industry. In addition, there's still a lot of confusion around the ACA itself. There are still people who don't know that the ACA and Obamacare refer to the same legislation.</p>"
    +"<p>People also tend to lump all problems associated with the health care system in with the ACA, list the rising cost of health care.</p>"
    +"<p>Looking at the above chart, one would expect that the cost of health care has decreased. That's not true at all; health care costs have consistently been on the rise by over 4% per year in the past 15 years.</p>"
    +"<p></p>"
    +"<p>Note that not everyone comes out a winner with the implementation of the ACA. Opening access to health insurance to people with pre-existing conditions has caused health insurance companies raise rates to cover the cost. In particular, the ACA has not benefitted people who make too much to qualify for government subsidies, but not enough to pay the premiums for the insurance plans available to them</p>"

]

console.log("Data loaded.");
