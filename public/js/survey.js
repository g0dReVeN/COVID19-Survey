Survey
    .StylesManager
    .applyTheme("modern");


// function appendMicrophoneToResults(results) {
//     if (!recorderResult)
//         return results;

//     let micJSON = {
//         "Microphone": recorderResult
//     };

//     return { ...results, ...micJSON };
// }

// function appendMicrophoneToResults(results) {
//     if (!recorderResult)
//         return JSON.stringify(results)
//     var micJSON = {
//         "microphone": recorderResult
//     }
//     var finalResult = { ...results, ...micJSON }
//     return JSON.stringify(finalResult);
// }

function surveyValidateQuestion(s, options) {
    if (options.name == 'microphone') {
        if (!recorderResult)
            options.error = "Please provide a cough sample!";
    }
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
                    "html": "<article class='intro'><div class='intro__body wysiwyg'><p>Would you like to help save the world from the coronavirus?</p><p>We want to develop a smartphone app that can help to identify COVID-19 (coronavirus) coughs. Once it is rolled out, the app will be able to tell you whether you should have a lab test done. This will help to reduce the number of lab tests needed so that time, reagents and money is not wasted on so many negative tests.</p><p>But first, we need to teach a computer what a COVID-19 cough sounds like.</p><p>If you would like to learn more about the study, please visit our information page <a href='assets/information.pdf'>here</a>.</p><p>If you have any questions, please visit our FAQ page <a href='assets/FAQ.pdf'>here</a> for questions commonly asked.</p><p><strong>If you have had a lab test for COVID-19 (coronavirus) recently, please complete the following survey.</strong></p><p>Thank you!</p></div> </article>"
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
                        "you have read and understood the above explanation about the study",
                        "you agree to participate",
                        "you understand that your participation in this study is strictly voluntary"
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
                    "visibleIf": "{lab_test} = 'Yes'",
                    "enableIf": "{lab_test} = 'Yes'",
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
                    "name": "lab_result",
                    "title": "My SARS-CoV-2 (Coronavirus or COVID-19 test) result was...",
                    "visibleIf": "{lab_test} = 'Yes'",
                    "enableIf": "{lab_test} = 'Yes'",
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
                }
            ]
        },
        {
            "name": "page3",
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
                    "name": "age_group",
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
            "name": "page4",
            "elements": [
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
                },
                {
                    "type": "checkbox",
                    "name": "symptoms",
                    "title": "Tick off all the symptoms that apply to you. I am experiencing:",
                    "choices": [
                        "A cold",
                        "Diarrhoea",
                        "Sorethroat",
                        "Bodyaches",
                        "Headaches",
                        "Fatigue",
                        "Difficulty breathing",
                        "A fever"
                    ]
                },
                {
                    "type": "radiogroup",
                    "name": "fever",
                    "title": "Is the temperature of your fever greater than 37.8°C/100.04°F?",
                    "visibleIf": "{symptoms} contains 'a fever'",
                    "enableIf": "{symptoms} contains 'a fever'",
                    "isRequired": true,
                    "choices": [
                        "Yes",
                        "No",
                        "Unsure"
                    ]
                }
            ]
        },
        {
            "name": "page5",
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
                }
            ]
        },
        {
            "name": "page6",
            "elements": [
                {
                    "type": "dropdown",
                    "name": "country_tested",
                    "title": "In which country were you tested?",
                    "defaultValue": "Prefer not to say",
                    "isRequired": true,
                    "choices": [
                        "Prefer not to say",
                        "South Africa",
                        "Afghanistan",
                        "Albania",
                        "Algeria",
                        "American Samoa",
                        "Andorra",
                        "Angola",
                        "Anguilla",
                        "Antarctica",
                        "Antigua and Barbuda",
                        "Argentina",
                        "Armenia",
                        "Aruba",
                        "Australia",
                        "Austria",
                        "Azerbaijan",
                        "Bahamas (the)",
                        "Bahrain",
                        "Bangladesh",
                        "Barbados",
                        "Belarus",
                        "Belgium",
                        "Belize",
                        "Benin",
                        "Bermuda",
                        "Bhutan",
                        "Bolivia (Plurinational State of)",
                        "Bonaire, Sint Eustatius and Saba",
                        "Bosnia and Herzegovina",
                        "Botswana",
                        "Bouvet Island",
                        "Brazil",
                        "British Indian Ocean Territory (the)",
                        "Brunei Darussalam",
                        "Bulgaria",
                        "Burkina Faso",
                        "Burundi",
                        "Cabo Verde",
                        "Cambodia",
                        "Cameroon",
                        "Canada",
                        "Cayman Islands (the)",
                        "Central African Republic (the)",
                        "Chad",
                        "Chile",
                        "China",
                        "Christmas Island",
                        "Cocos (Keeling) Islands (the)",
                        "Colombia",
                        "Comoros (the)",
                        "Congo (the Democratic Republic of the)",
                        "Congo (the)",
                        "Cook Islands (the)",
                        "Costa Rica",
                        "Croatia",
                        "Cuba",
                        "Curaçao",
                        "Cyprus",
                        "Czechia",
                        "Côte d'Ivoire",
                        "Denmark",
                        "Djibouti",
                        "Dominica",
                        "Dominican Republic (the)",
                        "Ecuador",
                        "Egypt",
                        "El Salvador",
                        "Equatorial Guinea",
                        "Eritrea",
                        "Estonia",
                        "Eswatini",
                        "Ethiopia",
                        "Falkland Islands (the) [Malvinas]",
                        "Faroe Islands (the)",
                        "Fiji",
                        "Finland",
                        "France",
                        "French Guiana",
                        "French Polynesia",
                        "French Southern Territories (the)",
                        "Gabon",
                        "Gambia (the)",
                        "Georgia",
                        "Germany",
                        "Ghana",
                        "Gibraltar",
                        "Greece",
                        "Greenland",
                        "Grenada",
                        "Guadeloupe",
                        "Guam",
                        "Guatemala",
                        "Guernsey",
                        "Guinea",
                        "Guinea-Bissau",
                        "Guyana",
                        "Haiti",
                        "Heard Island and McDonald Islands",
                        "Holy See (the)",
                        "Honduras",
                        "Hong Kong",
                        "Hungary",
                        "Iceland",
                        "India",
                        "Indonesia",
                        "Iran (Islamic Republic of)",
                        "Iraq",
                        "Ireland",
                        "Isle of Man",
                        "Israel",
                        "Italy",
                        "Jamaica",
                        "Japan",
                        "Jersey",
                        "Jordan",
                        "Kazakhstan",
                        "Kenya",
                        "Kiribati",
                        "Korea (the Democratic People's Republic of)",
                        "Korea (the Republic of)",
                        "Kuwait",
                        "Kyrgyzstan",
                        "Lao People's Democratic Republic (the)",
                        "Latvia",
                        "Lebanon",
                        "Lesotho",
                        "Liberia",
                        "Libya",
                        "Liechtenstein",
                        "Lithuania",
                        "Luxembourg",
                        "Macao",
                        "Madagascar",
                        "Malawi",
                        "Malaysia",
                        "Maldives",
                        "Mali",
                        "Malta",
                        "Marshall Islands (the)",
                        "Martinique",
                        "Mauritania",
                        "Mauritius",
                        "Mayotte",
                        "Mexico",
                        "Micronesia (Federated States of)",
                        "Moldova (the Republic of)",
                        "Monaco",
                        "Mongolia",
                        "Montenegro",
                        "Montserrat",
                        "Morocco",
                        "Mozambique",
                        "Myanmar",
                        "Namibia",
                        "Nauru",
                        "Nepal",
                        "Netherlands (the)",
                        "New Caledonia",
                        "New Zealand",
                        "Nicaragua",
                        "Niger (the)",
                        "Nigeria",
                        "Niue",
                        "Norfolk Island",
                        "Northern Mariana Islands (the)",
                        "Norway",
                        "Oman",
                        "Pakistan",
                        "Palau",
                        "Palestine, State of",
                        "Panama",
                        "Papua New Guinea",
                        "Paraguay",
                        "Peru",
                        "Philippines (the)",
                        "Pitcairn",
                        "Poland",
                        "Portugal",
                        "Puerto Rico",
                        "Qatar",
                        "Republic of North Macedonia",
                        "Romania",
                        "Russian Federation (the)",
                        "Rwanda",
                        "Réunion",
                        "Saint Barthélemy",
                        "Saint Helena, Ascension and Tristan da Cunha",
                        "Saint Kitts and Nevis",
                        "Saint Lucia",
                        "Saint Martin (French part)",
                        "Saint Pierre and Miquelon",
                        "Saint Vincent and the Grenadines",
                        "Samoa",
                        "San Marino",
                        "Sao Tome and Principe",
                        "Saudi Arabia",
                        "Senegal",
                        "Serbia",
                        "Seychelles",
                        "Sierra Leone",
                        "Singapore",
                        "Sint Maarten (Dutch part)",
                        "Slovakia",
                        "Slovenia",
                        "Solomon Islands",
                        "Somalia",
                        "South Africa",
                        "South Georgia and the South Sandwich Islands",
                        "South Sudan",
                        "Spain",
                        "Sri Lanka",
                        "Sudan (the)",
                        "Suriname",
                        "Svalbard and Jan Mayen",
                        "Sweden",
                        "Switzerland",
                        "Syrian Arab Republic",
                        "Taiwan (Province of China)",
                        "Tajikistan",
                        "Tanzania, United Republic of",
                        "Thailand",
                        "Timor-Leste",
                        "Togo",
                        "Tokelau",
                        "Tonga",
                        "Trinidad and Tobago",
                        "Tunisia",
                        "Turkey",
                        "Turkmenistan",
                        "Turks and Caicos Islands (the)",
                        "Tuvalu",
                        "Uganda",
                        "Ukraine",
                        "United Arab Emirates (the)",
                        "United Kingdom of Great Britain and Northern Ireland (the)",
                        "United States Minor Outlying Islands (the)",
                        "United States of America (the)",
                        "Uruguay",
                        "Uzbekistan",
                        "Vanuatu",
                        "Venezuela (Bolivarian Republic of)",
                        "Viet Nam",
                        "Virgin Islands (British)",
                        "Virgin Islands (U.S.)",
                        "Wallis and Futuna",
                        "Western Sahara",
                        "Yemen",
                        "Zambia",
                        "Zimbabwe",
                    ]
                },
                {
                    "type": "radiogroup",
                    "name": "travelled_internationally_past_14_days",
                    "title": "Have you travelled internationally during the past 14 days?",
                    "isRequired": true,
                    "choices": [
                        "Yes",
                        "No"
                    ]
                },
                {
                    "type": "radiogroup",
                    "name": "history_of_travelling_to_infected_area",
                    "title": "Do you have a history of travelling to an area infected with the Covid-19 virus?",
                    "isRequired": true,
                    "choices": [
                        "Yes",
                        "No"
                    ]
                },
                {
                    "type": "radiogroup",
                    "name": "contact_with_patient",
                    "title": "Have you had direct contact with or are you taking care of a Covid-19 positive patient?",
                    "isRequired": true,
                    "choices": [
                        "Yes",
                        "No"
                    ]
                }
            ]
        },
        {
            "name": "page7",
            "elements": [
                {
                    "type": "microphone",
                    "description": "Please record a few seconds of yourself coughing using your device's microphone. We know this may be very uncomfortable for you but the future development of the app hinges on this. To start/stop the recording, please tap/click on the red record button below. You must allow the use of your device's microphone if prompted. The recording will automatically stop after 5 seconds. You may record yourself as many times as you like but keep in mind, only your last recording will be submitted. You may listen to your recording by tapping/clicking on the play button.",
                    "name": "microphone",
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
}

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

        form.append('sample', recorderResult);

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

$("#surveyElement").Survey({ model: survey, onValidateQuestion: surveyValidateQuestion });