Survey
    .StylesManager
    .applyTheme("modern");


function appendMicrophoneToResults(results) {
    if (!recorderResult)
        return results;

    let micJSON = {
        "Microphone": recorderResult
    };

    return { ...results, ...micJSON };
}

let json = {
    "title": "COVID-19 App Development Questionnaire",
    "completedHtml": "<h4>Thank you for completing the survey and stay safe!</h4>",
    "pages": [
        {
            "name": "page0",
            "elements": [
                {
                    "type": "html",
                    "name": "survey_intro",
                    "html": "<article class='intro'><div class='intro__body wysiwyg'><p>Would you like to help save the world from the coronavirus?</p><p>We want to develop a smartphone app that can help to identify COVID-19 (coronavirus) coughs. Once it is rolled out, the app will be able to tell you whether you should have a lab test done. This will help to reduce the number of lab tests needed so that time, reagents and money is not wasted on so many negative tests.</p><p>But first, we need to teach a computer what a COVID-19 cough sounds like.</p><p>If you would like to learn more about the study, please visit our information page <a href='assets/information.pdf'>here</a>.</p><p>If you have any questions, please visit our FAQ page <a href='assets/FAQ.pdf'>here</a> for common questions asked.</p><p><strong>If you have had a lab test for COVID-19 (coronavirus) recently, please complete the following survey.</strong></p><p>Thank you!</p></div> </article>"
                }
            ]
        },
        {
            "name": "page1",
            "elements": [
                {
                    "type": "html",
                    "name": "question1",
                    "html": "<article class='intro'><div class='intro__body wysiwyg'><h2>Please confirm that:</h2></div></article>"
                },
                {
                    "type": "radiogroup",
                    "name": "User_is_over_18",
                    "title": "you are over 18 years old",
                    "isRequired": true,
                    "choices": [
                        "Yes",
                        "No"
                    ]
                },
                {
                    "type": "checkbox",
                    "name": "Permission_from_user",
                    "isRequired": true,
                    "validators": [
                        {
                            "type": "answercount",
                            "text": "This section is required in order to complete the survey",
                            "minCount": 3,
                            "maxCount": 0
                        }
                    ],
                    "titleLocation": "hidden",
                    "choices": [
                        "you have read and understood the above explanation about the study",
                        "you agree to participate",
                        "you understand that your participation in this study is strictly voluntary"
                    ]
                },
                {
                    "type": "checkbox",
                    "name": "Permission_from parents_or_guardians",
                    "title": "Please ask your parent/guardian to complete the following section:",
                    "visibleIf": "{User_is_over_18} = 'No'",
                    "enableIf": "{User_is_over_18} = 'No'",
                    "isRequired": true,
                    "validators": [
                        {
                            "type": "answercount",
                            "text": "This section is required in order to complete the survey",
                            "minCount": 3,
                            "maxCount": 0
                        }
                    ],
                    "choices": [
                        "you have read and understood the above explanation about the study",
                        "you agree that your child participates",
                        "you understand that their participation in this study is strictly voluntary"
                    ]
                }
            ]
        },
        {
            "name": "page2",
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "Lab_test",
                    "title": "Have you had a SARS-CoV-2 (coronavirus or COVID-19) laboratory test?",
                    "isRequired": true,
                    "validators": [
                        {
                            "type": "expression",
                            "text": "You cannot complete the survey if you haven't been tested!",
                            "expression": "{Lab_test} = 'Yes'"
                        }
                    ],
                    "choices": [
                        "Yes",
                        "No",
                        "Not sure"
                    ]
                },
                {
                    "type": "radiogroup",
                    "name": "Lab_result",
                    "title": "My SARS-CoV-2 (Coronavirus or COVID-19 test) result was...",
                    "isRequired": true,
                    "validators": [
                        {
                            "type": "expression",
                            "text": "You cannot complete the survey if you are not sure!",
                            "expression": "{Lab_result} <> 'Not sure'"
                        }
                    ],
                    "choices": [
                        "Positive (I have COVID-19)",
                        "Negative (I do not have COVID-19)",
                        "Not sure"
                    ]
                }
            ]
        },
        {
            "name": "page3",
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "Days_ago_since_test_done",
                    "title": "How many days ago was your test done?",
                    "isRequired": true,
                    "choices": [
                        "1-3",
                        "4-6",
                        "7-9",
                        "10-12",
                        "13-15",
                        ">15"
                    ]
                },
                {
                    "type": "radiogroup",
                    "name": "Days_coughing",
                    "title": "For how many days have you been coughing?",
                    "isRequired": true,
                    "choices": [
                        "1-3",
                        "4-6",
                        "7-9",
                        "10-12",
                        "13-15",
                        ">15"
                    ]
                }
            ]
        },
        {
            "name": "page4",
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "Gender",
                    "title": "I am:",
                    "isRequired": true,
                    "choices": [
                        "Male",
                        "Female",
                        "Prefer not to say"
                    ]
                },
                {
                    "type": "radiogroup",
                    "name": "Age_group",
                    "title": "What is your age in years?",
                    "isRequired": true,
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
        },
        {
            "name": "page5",
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "Smoker",
                    "title": "Are you a smoker?",
                    "isRequired": true,
                    "choices": [
                        "No, I have never smoked.",
                        "Yes, I am a current smoker.",
                        "I have smoked in the past, but I don't smoke anymore."
                    ]
                },
                {
                    "type": "checkbox",
                    "name": "Lung_problems",
                    "title": "Which, if any, other lung problems do you have? (check all that apply)",
                    "hasOther": true,
                    "otherPlaceHolder": "Please specify any other lung conditions",
                    "choices": [
                        "Lung Cancer",
                        "Chronic Obstructive Pulmonary Disorder (COPD)",
                        "Cystic Fibrosis (CF)",
                        "Tuberculosis (TB)",
                        "Asthma"
                    ],
                    "otherText": "Other"
                }
            ]
        }, {
            "name": "page6",
            "elements": [
                {
                    "type": "microphone",
                    "description": "Please record a few seconds of yourself coughing using your smartphone. Please enable microphone permission when prompted.",
                    "name": "Microphone",
                    "hideNumber": true,
                    "title": "Cough sample"
                }
            ]
        }
    ],
    "showQuestionNumbers": "off",
    "showProgressBar": "top",
    "clearInvisibleValues": "onHidden",
    "startSurveyText": "Start survey",
    "completeText": "Complete survey",
    "firstPageIsStarted": true
};

window.survey = new Survey.Model(json);

const doc = new jsPDF();
let col = ["Questions", "Your Answers"];
let row = [];

survey
    .onComplete
    .add(function (result) {
        const form = new FormData();

        Object.keys(result.data).forEach(key => {
            form.append(key, result.data[key]);
        })

        form.append('sample', new File());

        $.ajax({
            url: 'https://coughtest.online/',
            method: 'POST',
            data: form,
            processData: false,
            contentType: 'multipart/form-data',
            success: function (data) {
                alert(data);
                for (let key in result.data) {
                    let temp = [key[0].toUpperCase() + key.slice(1).replace('_', ' '), result.data[key]];
                    row.push(temp);
                }

                doc.autoTable(col, row);
                doc.save('Results.pdf');
            },
            error: function (data) {
                alert(data);
            }
        });
    });

$("#surveyElement").Survey({ model: survey });
