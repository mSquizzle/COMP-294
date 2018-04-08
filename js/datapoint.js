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

//todo - combine into single object to represent state

var chartTitles = {
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


function extractMax(dataSets){
	var max = 0.0;
	for(var i = 0; i < dataSets.length; i++){
		var data = Object.entries(dataSets[i]);
		for(var [key, value] of data){
			if(max < value){
				max = value;
			}
		}
	}
	return max;
};

console.log("Data loaded.");
