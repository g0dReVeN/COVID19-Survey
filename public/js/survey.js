Survey
    .StylesManager
    .applyTheme("modern");

function surveyValidateQuestion(s, options) {
    if (options.name == 'microphone') {
        if (recorderResult == -1)
            options.error = "We weren't able to detect a cough. Please cough a little louder or cough more closer to the microphone.";
        if (!recorderResult)
            options.error = "You have not provided a cough sample! Please provide a cough sample to continue";
    }
}

function surveyRenderQuestion(s, options) {
    if (options.htmlElement.getElementsByClassName("noUi-target noUi-ltr noUi-horizontal")[0]) {
        $('.noUi-target.noUi-ltr.noUi-horizontal').parent().css('paddingLeft', '18px');
        $('h4.sv-title.sv-panel__title').first().css('padding', '0.25em 0.44em');
    }
    if (options.question.name == "permission_from_parents_or_guardians") {
        const a = document.createElement("A");
        const span = document.createElement("SPAN");
        const parent = document.querySelector('[title="You confirm your child/ward has read or had the"]');

        a.innerText = "children's information page";
        a.href = "assets/children_info.pdf";
        a.target = "_blank";
        span.innerText = " read to them and that he/she understands and agrees to participate";

        parent.appendChild(a);
        parent.appendChild(span);
    }
}
const contries = Object.values(isoCountries);
contries.unshift("Prefer not to say");
let json = {
    "title": "COVID-19 App Development Questionnaire",
    "completedHtml": "<h4>Thank you for completing the survey. You will receive your results shortly. Please continue to keep safe!</h4>",
    "pages": [
        {
            "name": "page0",
            "elements": [
                {
                    "type": "image",
                    "name": "stellenbosch-university-logo",
                    "imageLink": "assets/Stellenbosch-University-Logo.jpeg",
                    "imageFit": "contain",
                    "imageHeight": 150,
                    "imageWidth": 150,
                    "width": "160px"
                },
                {
                    "type": "panel",
                    "name": "first_page_container_panel",
                    "elements": [
                        {
                            "type": "html",
                            "name": "survey_intro",
                            "html": "<article class='intro'><div class='intro__body wysiwyg'><p>Would you like to join in the fight against the coronavirus?</p><p>We want to develop a smartphone app that can help to identify COVID-19 (coronavirus) coughs. If we are successful, the app will be able to tell you whether you should have a lab test done. This will help to reduce the number of lab tests needed so that time, reagents and money is not wasted on so many negative tests.</p><p>But first, we need to teach a computer what a COVID-19 cough sounds like.</p><p>If you would like to learn more about the study, please visit our information page <a href='assets/information.pdf' target='_blank'>here</a> or for a more child friendly version <a href='assets/children_info.pdf' target='_blank'>here</a>.</p><p>If you have any questions, please visit our FAQ page <a href='assets/FAQ.pdf' target='_blank'>here</a> for questions commonly asked.</p><p><strong>If you have had a lab test for COVID-19 (coronavirus) recently, please complete the following survey.</strong></p><p>Thank you!</p></div> </article>",
                        }
                    ],
                    "startWithNewLine": false
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
                    "name": "user_is_over_18",
                    "title": "you are over 18 years old",
                    "isRequired": true,
                    "choices": [
                        "Yes",
                        "No"
                    ]
                },
                {
                    "type": "checkbox",
                    "name": "permission_from_user",
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
                        "You have read and understood the explanation on the previous page about the study",
                        "You agree to participate",
                        "You understand that your participation in this study is strictly voluntary"
                    ]
                },
                {
                    "type": "checkbox",
                    "name": "permission_from_parents_or_guardians",
                    "title": "Please ask your parent/guardian to complete the following section:",
                    "visibleIf": "{user_is_over_18} = 'No'",
                    "enableIf": "{user_is_over_18} = 'No'",
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
                        "You have read and understood the explanation on the previous page about the study",
                        "You understand that your child's/ward's participation in this study is strictly voluntary",
                        "You confirm your child/ward has read or had the"
                    ]
                },
            ]
        },
        {
            "name": "page2",
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "lab_test",
                    "title": "Have you had a SARS-CoV-2 (coronavirus or COVID-19) laboratory test?",
                    "isRequired": true,
                    "validators": [
                        {
                            "type": "expression",
                            "text": "You cannot complete the survey if you haven't been tested!",
                            "expression": "{lab_test} = 'Yes'"
                        }
                    ],
                    "choices": [
                        "Yes",
                        "No",
                        "Unsure"
                    ]
                },
                {
                    "type": "radiogroup",
                    "name": "days_ago_since_test_done",
                    "title": "How many days ago was your test done?",
                    "isRequired": true,
                    "visibleIf": "{lab_test} = 'Yes'",
                    "enableIf": "{lab_test} = 'Yes'",
                    "choices": [
                        "1-3",
                        "4-6",
                        "7-9",
                        "10-12",
                        "13-15",
                        ">15"
                    ]
                },
            ]
        },
        {
            "name": "page3",
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "lab_result",
                    "title": "My SARS-CoV-2 (Coronavirus or COVID-19 test) result was...",
                    "isRequired": true,
                    "validators": [
                        {
                            "type": "expression",
                            "text": "You cannot complete the survey if you are not sure!",
                            "expression": "{lab_result} <> 'Unsure'"
                        }
                    ],
                    "choices": [
                        "Positive (I have COVID-19)",
                        "Negative (I do not have COVID-19)",
                        "Unsure"
                    ]
                },
                {
                    "type": "dropdown",
                    "name": "country_tested",
                    "title": "In which country were you tested?",
                    "defaultValue": "Prefer not to say",
                    "isRequired": true,
                    "choices": contries
                },
                {
                    "type": "radiogroup",
                    "name": "contact_with_patient",
                    "title": "Have you had direct contact with or are you taking care of a COVID-19 positive patient?",
                    "isRequired": true,
                    "choices": [
                        "Yes",
                        "No"
                    ]
                }
            ]
        },
        {
            "name": "page4",
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "gender",
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
                    "name": "age_group_18_and_over",
                    "title": "Which of the following age groups do you fall into?",
                    "visibleIf": "{user_is_over_18} = 'Yes'",
                    "enableIf": "{user_is_over_18} = 'Yes'",
                    "isRequired": true,
                    "choices": [
                        "18-29",
                        "30-39",
                        "40-49",
                        "50-59",
                        "60-69",
                        "70-79",
                        ">79"
                    ]
                },
                {
                    "type": "radiogroup",
                    "name": "age_group_under_18",
                    "title": "Which of the following age groups do you fall into?",
                    "visibleIf": "{user_is_over_18} = 'No'",
                    "enableIf": "{user_is_over_18} = 'No'",
                    "isRequired": true,
                    "choices": [
                        "0-9",
                        "10-17",
                    ]
                }
            ]
        },
        {
            "name": "page5",
            "elements": [
                {
                    "type": "checkbox",
                    "name": "lung_problems",
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
                },
                {
                    "type": "checkbox",
                    "name": "symptoms",
                    "title": "Tick off all the symptoms that apply to you. I am experiencing:",
                    "choices": [
                        "A cold",
                        "A fever",
                        "Diarrhoea",
                        "Sore throat",
                        "Body aches",
                        "Headaches",
                        "Fatigue",
                        "Difficulty in breathing",
                        "Redness of eyes",
                        "Loss of smell",
                        "Loss of taste",
                        "Nausea",
                        "Vomiting",
                        "Weakness"
                    ]
                },
                {
                    "type": "radiogroup",
                    "name": "know_temperature",
                    "title": "Do you know your temperature today or can you take it your now?",
                    "visibleIf": "{symptoms} contains 'A fever'",
                    "enableIf": "{symptoms} contains 'A fever'",
                    "isRequired": true,
                    "choices": [
                        "Yes",
                        "No"
                    ]
                },
                {
                    "type": "panel",
                    "name": "temp_panel",
                    "title": "Please adjust the slider to match your temperature today: *",
                    "visibleIf": "{know_temperature} = 'Yes'",
                    "enableIf": "{know_temperature} = 'Yes'",
                    "elements": [
                        {
                            "type": "radiogroup",
                            "name": "temp_type",
                            "title": "Temperature Scale:",
                            "defaultValue": "°C",
                            "choices": [
                                "°C",
                                "°F"
                            ]
                        },
                        {
                            "type": "nouislider",
                            "name": "temperature_C",
                            "title": "Temperature °C",
                            "visibleIf": "{temp_type} = '°C'",
                            "enableIf": "{temp_type} = '°C'",
                            "isRequired": true,
                            "step": 0.1,
                            "rangeMin": 36,
                            "rangeMax": 41,
                            "pipsValues": null,
                            "pipsText": null,
                            "pipsDensity": 15
                        },
                        {
                            "type": "nouislider",
                            "name": "temperature_F",
                            "title": "Temperature °F",
                            "visibleIf": "{temp_type} = '°F'",
                            "enableIf": "{temp_type} = '°F'",
                            "isRequired": true,
                            "step": 0.1,

                            "rangeMin": 97,
                            "rangeMax": 106,
                            "pipsValues": null,
                            "pipsText": null,
                            "pipsDensity": 15
                        }
                    ]
                },
            ]
        },
        {
            "name": "page6",
            "elements": [
                {
                    "type": "radiogroup",
                    "name": "smoker",
                    "title": "Are you a smoker?",
                    "isRequired": true,
                    "choices": [
                        "No, I have never smoked.",
                        "Yes, I am a current smoker.",
                        "I have smoked in the past, but I don't smoke anymore."
                    ]
                },
                {
                    "type": "radiogroup",
                    "name": "have_a_cough",
                    "title": "Do you have a cough?",
                    "isRequired": true,
                    "choices": [
                        "Yes",
                        "No"
                    ]
                },
                {
                    "type": "radiogroup",
                    "name": "days_coughing",
                    "title": "For how many days have you been coughing?",
                    "visibleIf": "{have_a_cough} = 'Yes'",
                    "enableIf": "{have_a_cough} = 'Yes'",
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
            "name": "page7",
            "elements": [
                {
                    "type": "microphone",
                    "description": "Please record a few seconds of yourself coughing using your device's microphone. We know this may be very uncomfortable for you but the future development of the app hinges on this. To start/stop the recording, please tap/click on the red record button below. Please allow access to your device's microphone if prompted. The recording will automatically stop after 15 seconds. You may record yourself as many times as you like but keep in mind, only your last recording will be submitted. You may listen to your recording by tapping/clicking on the play button.",
                    "name": "microphone",
                    "hideNumber": true,
                    "title": "Record a cough sample *",
                    "visibleIf": "{have_a_cough} = 'Yes'",
                    "enableIf": "{have_a_cough} = 'Yes'"
                }
            ]
        }
    ],
    "showQuestionNumbers": "off",
    "showProgressBar": "top",
    "clearInvisibleValues": "onHidden",
    "startSurveyText": "Start Survey",
    "completeText": "Finish",
    "firstPageIsStarted": true
}

window.survey = new Survey.Model(json);

const form = new FormData();
const doc = new jsPDF();
let col = ["Questions", "Your Answers"];
let row = [];

doc.text('COVID-19 App Development Questionnaire', 55, 15);
doc.text('Would you like to help save the world from the coronavirus?', 10, 26);
doc.text(doc.splitTextToSize('We want to develop a smartphone app that can help to identify COVID-19 (coronavirus) coughs. If we are successful, the app will be able to tell you whether you should have a lab test done. This will help to reduce the number of lab tests needed so that time, reagents and money is not wasted on so many negative tests.', 180), 10, 33);
doc.text('But first, we need to teach a computer what a COVID-19 cough sounds like.', 10, 65);

survey
    .onComplete
    .add(function (result) {
        grecaptcha.ready(function () {
            grecaptcha.execute(clientId, { action: 'survey' }).then(function (token) {
                for (prop in result.data) {
                    let key = prop
                    let value = result.data[prop];

                    if (prop == 'temp_type' | prop == 'know_temperature')
                        continue;
                    else if (prop.includes('age_group'))
                        key = 'age_group';
                    else if (prop.includes('temperature_C'))
                        key = 'temperature';
                    else if (prop.includes('temperature_F')) {
                        key = 'temperature';
                        value = (5 / 9) * (value - 32);
                    }

                    form.append(key, value);
                    row.push([key[0].toUpperCase() + key.slice(1).replace(/_+/g, ' '), value]);
                }

                doc.autoTable(col, row, { startY: 70 });
                form.append('token', token);

                if (verifiedCC) {
                    form.append('target_group', verifiedCC);
                }

                if (recorderResult) {
                    form.append('sample', recorderResult);
                }

                $.ajax({
                    url: 'https://coughtest.online/',
                    method: 'POST',
                    data: form,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        doc.save('Results.pdf');
                    },
                    error: function (data) {
                        alert('Error - ' + data.responseText);
                    }
                })
            });
        });

    });

$("#surveyElement").Survey({ model: survey, onValidateQuestion: surveyValidateQuestion, onAfterRenderQuestion: surveyRenderQuestion });