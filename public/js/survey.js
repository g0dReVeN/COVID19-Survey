

Survey
    .StylesManager
    .applyTheme("modern");

var json2 = {
    "completedHtml": "<h3>Thank you for your feedback.</h3> <h5>Your thoughts and ideas will help us to create a great product!</h5>",
    "completedHtmlOnCondition": [
        {
            "expression": "{nps_score} > 8",
            "html": "<h3>Thank you for your feedback.</h3> <h5>We glad that you love our product. Your ideas and suggestions will help us to make our product even better!</h5>"
        }, {
            "expression": "{nps_score} < 7",
            "html": "<h3>Thank you for your feedback.</h3> <h5> We are glad that you share with us your ideas.We highly value all suggestions from our customers. We do our best to improve the product and reach your expectation.</h5>\n"
        }
     ]
};

var json = {
    "title": "Covid19 App Development Questionnaire",
    "pages": [
        {
            "elements": [
                {
                    "type": "html",
                    "name": "survey_intro",
                    "html": "<article class='intro'><div class='intro__body wysiwyg'><p>Would you like to help save the world from the coronavirus?</p><p>We want to develop a smartphone app that can help to identify COVID-19 (coronavirus) coughs. Once it is rolled out, the app will be able to tell you whether you should have a lab test done. This will help to reduce the number of lab tests needed so that time, reagents and money is not wasted on so many negative tests.</p><p>But first, we need to teach a computer what a COVID-19 cough sounds like.</p><p>If you would like to learn more about the study, please visit our information page <a href=''>here</a>.<p><strong>If you have had a lab test for COVID-19 (coronavirus) recently, please complete the survey below.</strong></p><p>Thank you!</p></div> </article>"
                }
            ],
            "name": "page0"
        }, {
            "name": "page1",
            "elements": [
                {
                    "type": "html",
                    "name": "survey_permission_description",
                    "html": "<article class='intro'><div class='intro__body wysiwyg'><p><strong>By clicking NEXT you are confirming that:</strong></p><ul>\t<li>\t\t<p>you are over 18 years old, or have your parent's permission to participate,</p>\t</li>\t<li>\t\t<p>you have read and understood the previous explanation about the study,</p>\t</li>\t<li>\t\t<p>you agree to participate</p>\t</li>\t<li>\t\t<p>you understand that your participation in this study is strictly voluntary</p>\t</li></ul></div> </article>"
                }, {
                    "type": "radiogroup",
                    "name": "survey_permission",
                    "title": "Do you agree to all the terms?",
                    "isRequired": true,
                    "hideNumber": true,
                    "choices": ["Yes", "No"]
                }

            ]
        }, {
            "name": "page2",
            "visible": false,
            "visibleIf": "{survey_permission} = 'Yes'",
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "lab_test",
                    "title": "Have you had a SARS-CoV-2 (coronavirus or COVID-19) laboratory test?",
                    "isRequired": true,
                    "hideNumber": true,
                    "choices": [
                        "Yes",
                        "No",
                        "Not sure"
                    ]
                }, {
                    "type": "radiogroup",
                    "name": "lab_result",
                    "visibleIf": "{lab_test} = 'Yes'",
                    "title": "My SARS-CoV-2 (coronavirus or COVID-19 test) result was...",
                    "isRequired": true,
                    "hideNumber": true,
                    "choices": [
                        "Positive (I have COVID-19)",
                        "Negative (I do not have COVID-19)",
                        "Not sure"
                    ]
                }
            ]
        }, {
            "name": "page3",
            "visible": false,
            "visibleIf": "{lab_result} = 'Positive (I have COVID-19)' or {lab_result} = 'Negative (I do not have COVID-19)'",
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "days_ago_test_done",
                    "title": "How many days ago was your test done?",
                    "isRequired": true,
                    "hideNumber": true,
                    "choices": [
                        "1-3",
                        "4-6",
                        "7-9",
                        "10-12",
                        "13-15",
                        "more than 15"
                    ]
                }, {
                    "type": "radiogroup",
                    "name": "days_coughing",
                    "visibleIf": "{days_ago_test_done} notempty",
                    "title": "For how many days have you been coughing?",
                    "isRequired": true,
                    "hideNumber": true,
                    "choices": [
                        "1-3",
                        "4-6",
                        "7-9",
                        "10-12",
                        "13-15",
                        "more than 15"
                    ]
                }
            ]
        }, {
            "name": "page4",
            "visible": false,
            "visibleIf": "{lab_result} = 'Positive (I have COVID-19)' or {lab_result} = 'Negative (I do not have COVID-19)'",
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "gender",
                    "title": "I am",
                    "isRequired": true,
                    "hideNumber": true,
                    "choices": [
                        "Male",
                        "Female",
                        "Prefer not to say"
                    ]
                }, {
                    "type": "radiogroup",
                    "name": "days_coughing",
                    "visibleIf": "{gender} notempty",
                    "title": "What is your age in years?",
                    "isRequired": true,
                    "hideNumber": true,
                    "choices": [
                        "0-9",
                        "10-19",
                        "20-29",
                        "30-39",
                        "40-49",
                        "50-59",
                        "60-69",
                        "70-79",
                        ">79"
                    ]
                }
            ]
        }, {
            "name": "page5",
            "visible": false,
            "visibleIf": "{lab_result} = 'Positive (I have COVID-19)' or {lab_result} = 'Negative (I do not have COVID-19)'",
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "smoker",
                    "title": "Are you a smoker?",
                    "isRequired": true,
                    "hideNumber": true,
                    "choices": [
                        "No, I have never smoked.",
                        "Yes, I am a current smoker.",
                        "I have smoked in the past, but I don't smoke anymore."
                    ]
                }, {
                    "type": "checkbox",
                    "name": "lung_problems",
                    "visibleIf": "{gender} notempty",
                    "title": " Which, if any, other lung problems do you have? (check all that apply)",
                    "hasOther": true,
                    "otherPlaceHolder": "Please specify any other lung conditions.",
                    "otherText": "Other",
                    "isRequired": true,
                    "hideNumber": true,
                    "choices": [
                        "Lung Cancer",
                        "Chronic Obstructive Pulmonary Disorder (COPD)",
                        "Cystic Fibrosis (CF)",
                        "Tuberculosis (TB)",
                        "Asthma"
                    ]
                }
            ]
        }
    ]
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


