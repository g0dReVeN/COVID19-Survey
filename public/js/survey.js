

Survey
    .StylesManager
    .applyTheme("modern");

var json = {
    "completedHtml": "<h3>Thank you for your feedback.</h3> <h5>Your thoughts and ideas will help us to create a great product!</h5>",
    "completedHtmlOnCondition": [
        {
            "expression": "{nps_score} > 8",
            "html": "<h3>Thank you for your feedback.</h3> <h5>We glad that you love our product. Your ideas and suggestions will help us to make our product even better!</h5>"
        }, {
            "expression": "{nps_score} < 7",
            "html": "<h3>Thank you for your feedback.</h3> <h5> We are glad that you share with us your ideas.We highly value all suggestions from our customers. We do our best to improve the product and reach your expectation.</h5>\n"
        }
    ],
    title: "Tell us, what technologies do you use?",
    pages: [
        {
            name: "page1",
            questions: [
                {
                    type: "radiogroup",
                    choices: [
                        "Yes", "No"
                    ],
                    isRequired: true,
                    name: "frameworkUsing",
                    title: "Do you use any front-end framework like Bootstrap?"
                }, {
                    type: "checkbox",
                    choices: [
                        "Bootstrap", "Foundation"
                    ],
                    hasOther: true,
                    isRequired: true,
                    name: "framework",
                    title: "What front-end framework do you use?",
                    visibleIf: "{frameworkUsing} = 'Yes'"
                }
            ]
        }, {
            name: "page2",
            questions: [
                {
                    type: "radiogroup",
                    choices: [
                        "Yes", "No"
                    ],
                    isRequired: true,
                    name: "mvvmUsing",
                    title: "Do you use any MVVM framework?"
                }, {
                    type: "checkbox",
                    choices: [
                        "AngularJS", "KnockoutJS", "React"
                    ],
                    hasOther: true,
                    isRequired: true,
                    name: "mvvm",
                    title: "What MVVM framework do you use?",
                    visibleIf: "{mvvmUsing} = 'Yes'"
                }
            ]
        }, {
            name: "page3",
            questions: [
                {
                    type: "comment",
                    name: "about",
                    title: "Please tell us about your main requirements for Survey library"
                }
            ]
        }
    ],
	"showQuestionNumbers": "off"
};

window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (result) {
        document
            .querySelector('#surveyResult')
            .textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);
    });

$("#surveyElement").Survey({model: survey});


