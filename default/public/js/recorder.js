let observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (!mutation.addedNodes) return

    const target = document.getElementById('sq_117_ariaTitle');
    if (target) {
      let attrObserver = new MutationObserver(function (mutations) {
        $('h4.sv-title.sv-panel__title').first().css('background-color', 'rgba(26, 179, 148, 0.2)');
      });
      attrObserver.observe(target, { attributes: true });
    }

    for (let i = 0; i < mutation.addedNodes.length; i++) {
      let node = mutation.addedNodes[i];
      let c = node.childNodes;

      for (i = 0; i < c.length; i++) {
        if (c[i].title == "Record") {
          var btnStartRecording;
          var btnStopRecording;
          var btnReleaseMicrophone;
          var inputFileUpload;

          var otherParentNode = document.querySelector('[title="Record"]').parentNode;
          var audio = document.querySelector('audio');
          var finishButton = document.getElementsByClassName("sv-btn sv-footer__complete-btn")[0];
          var recorder;
          var harkMicrophone;
          var heardCough;
          var speech;
          var timeout;
          var recordBlob;
          var recordBlobUrl;
          var uploadBlob;
          var uploadBlobUrl;
          var BASE64_MARKER = ';base64,';

          var uploadOrRecordContent = document.createElement('DIV');
          var sliderParent = document.createElement('DIV');
          var sliderLabel = document.createElement('LABEL');
          var sliderInput = document.createElement('INPUT');
          var sliderSpan = document.createElement('SPAN');
          var sliderOptionsText = document.createElement('P');

          otherParentNode.innerHTML = '';
          otherParentNode.style.height = "350px";
          otherParentNode.parentNode.style.marginLeft = "0";
          sliderParent.style.textAlign = "center";
          sliderParent.style.marginTop = "50px";
          sliderLabel.className = "switch";
          sliderInput.type = "checkbox";
          sliderSpan.className = "slider";

          sliderLabel.appendChild(sliderInput);
          sliderLabel.appendChild(sliderSpan);
          sliderOptionsText.innerText = "Record   ";
          sliderOptionsText.style.display = "inline";
          sliderParent.appendChild(sliderOptionsText);
          sliderParent.appendChild(sliderLabel);
          sliderOptionsText = document.createElement('P');
          sliderOptionsText.innerText = "   Upload";
          sliderOptionsText.style.display = "inline";
          sliderParent.appendChild(sliderOptionsText);

          otherParentNode.appendChild(sliderParent);
          otherParentNode.appendChild(uploadOrRecordContent);

          sliderInput.addEventListener('click', function () {
            if (!sliderInput.checked)
              replaceRecordingElements();
            else
              replaceUploadElements();
          });

          function convertDataURIToBinary(dataURI) {
            var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
            var base64 = dataURI.substring(base64Index);
            var raw = window.atob(base64);
            var rawLength = raw.length;
            var array = new Uint8Array(new ArrayBuffer(rawLength));

            for (i = 0; i < rawLength; i++) {
              array[i] = raw.charCodeAt(i);
            }
            return array;
          }

          function readFile(e) {
            var audioFile = e.target.files[0];
            var reader = new FileReader();
            reader.addEventListener('load', function (e) {
              var audioFileType = audioFile.type;
              var fileSize = audioFile.size / 1024 / 1024;
              if (!audioFileType.startsWith("audio/")) {
                inputFileUpload.value = null;
                alert("Please upload an audio file");
                return;
              }
              if (fileSize > 5) {
                inputFileUpload.nextElementSibling.querySelector('span').innerHTML = "Choose a file";

                inputFileUpload.value = null;
                alert("Please upload an audio file that is at most 5MB in size");
                return;
              }
              var binary = convertDataURIToBinary(e.target.result);
              var blob = new Blob([binary], { type: audioFile.type });
              var blobUrl = URL.createObjectURL(blob);
              var testAudio = document.createElement('AUDIO');
              testAudio.src = blobUrl;
              testAudio.addEventListener('loadedmetadata', function () {
                var duration = testAudio.duration;
                if (duration > 15) {
                  inputFileUpload.nextElementSibling.querySelector('span').innerHTML = "Choose a file";

                  inputFileUpload.value = null;
                  alert("Please upload an audio file that is at most 15 seconds long");
                  return;
                }
                uploadBlob = blob;
                uploadBlobUrl = URL.createObjectURL(uploadBlob);
                replaceAudio(uploadBlobUrl);
                recorderResult = uploadBlob;
              }, false);
            });
            reader.readAsDataURL(audioFile);
          }

          function recordBtnHandlers() {
            btnStartRecording.addEventListener('click', () => {
              navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true } }).then(stream => {
                finishButton.disabled = true;
                finishButton.style.backgroundColor = "#dddddd";
                btnStartRecording.disabled = true;
                btnStartRecording.style.border = '';
                btnStartRecording.style.fontSize = '';
                heardCough = false;

                recorder = new MediaRecorder(stream);

                recorder.addEventListener('dataavailable', e => {
                  recordBlob = e.data;
                  recordBlobUrl = URL.createObjectURL(recordBlob);
                  replaceAudio(recordBlobUrl);
                  if (heardCough) {
                    recorderResult = e.data;
                    $("#sq_122_ariaTitle").css('background-color', 'rgba(26, 179, 148, 0.2)');
                  } else {
                    recorderResult = -1;
                  }
                });

                recorder.start();

                var harkOptions = {
                  threshold: -40
                };
                harkMicrophone = stream.clone();
                speech = hark(harkMicrophone, harkOptions);

                speech.on('speaking', function () {
                  console.log('cough detected');
                  heardCough = true;
                });

                btnStopRecording.disabled = false;
                btnStopRecording.className = "Rec";
                btnStartRecording.style.visibility = "hidden";
                btnStopRecording.style.visibility = "visible";
                timeout = setTimeout(function () { btnStopRecording.click(); }, 15000);
              });
            });

            btnStopRecording.addEventListener('click', () => {
              clearTimeout(timeout);
              recorder.stop();
              if (harkMicrophone) {
                speech.stop();
                speech = null;
                harkMicrophone.stop();
                harkMicrophone = null;
              }
              this.disabled = true;
              btnStopRecording.className = "notRec";
              btnStopRecording.style.visibility = "hidden";
              btnStartRecording.style.visibility = "visible";
              finishButton.disabled = false;
              finishButton.style.backgroundColor = "#1ab394";
              btnStartRecording.disabled = false;
              // Remove “recording” icon from browser tab
              recorder.stream.getTracks().forEach(i => i.stop());
            });
          }

          function replaceUploadElements() {
            inputFileUpload = document.createElement('INPUT');
            var uploadLabel = document.createElement('LABEL');
            var uploadSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            var svgpath1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            var svgpath2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            var uploadSpan = document.createElement('SPAN');

            uploadOrRecordContent.innerHTML = "";
            uploadOrRecordContent.style.textAlign = "center";
            uploadOrRecordContent.style.marginTop = "50px";

            inputFileUpload.type = "file";
            inputFileUpload.accept = "audio/*";
            inputFileUpload.className = "inputfile";
            inputFileUpload.id = "inputfile";

            uploadLabel.htmlFor = "inputfile";
            uploadSVG.setAttribute("viewbox","0 0 24 24");
            uploadSVG.setAttribute("height","24");
            uploadSVG.setAttribute("width","24");
            svgpath1.setAttribute("d","M0 0h24v24H0z");
            svgpath1.setAttribute("fill","none");
            svgpath2.setAttribute("d","M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z");
            uploadSpan.innerHTML = "Choose a file";

            inputFileUpload.addEventListener('change', readFile);
            inputFileUpload.addEventListener('change', function (e) {
              const fileName = e.target.value.split('\\').pop();

              if (fileName) {
                uploadSpan.innerHTML = fileName;
              }
            });

            uploadSVG.appendChild(svgpath1);
            uploadSVG.appendChild(svgpath2);
            uploadLabel.appendChild(uploadSVG);
            uploadLabel.appendChild(uploadSpan);
            uploadOrRecordContent.appendChild(inputFileUpload);
            uploadOrRecordContent.appendChild(uploadLabel);

            if (uploadBlob) {
              recorderResult = uploadBlob;
              replaceAudio(uploadBlobUrl);
            } else {
              recorderResult = null;
              replaceAudio();
            }
          }

          function replaceRecordingElements() {
            uploadOrRecordContent.innerHTML = "";
            uploadOrRecordContent.style.textAlign = "center";
            uploadOrRecordContent.style.height = "50px";
            uploadOrRecordContent.style.marginTop = "50px";

            btnStartRecording = document.createElement('BUTTON');
            btnStopRecording = document.createElement('BUTTON');
            btnReleaseMicrophone = document.createElement('BUTTON');

            btnStopRecording.className = "Rec";
            btnStartRecording.className = "notRec";
            btnStopRecording.style.visibility = "hidden";

            btnReleaseMicrophone.style.visibility = "hidden";

            btnStartRecording.id = "record";
            btnStopRecording.id = "save";

            uploadOrRecordContent.appendChild(btnStartRecording);
            uploadOrRecordContent.appendChild(btnStopRecording);
            uploadOrRecordContent.appendChild(btnReleaseMicrophone);

            $(".sv-description").css('color', 'rgb(64, 64, 64)');
            $("#record, #save").css('left', `${$(".footer").width() / 2 - 25}px`);

            if (recordBlob) {
              if (heardCough) recorderResult = recordBlob;
              else recorderResult = -1;
              replaceAudio(recordBlobUrl);
            }
            else {
              recorderResult = null;
              replaceAudio();
            }

            recordBtnHandlers();
          }

          function replaceAudio(src) {
            var newAudio = document.createElement('audio');

            newAudio.controls = true;
            newAudio.style.borderRadius = "15px";

            if (src) {
              newAudio.src = src;
            }

            var parentNode = audio.parentNode;
            if (!parentNode) {
              var audioParent = document.createElement('DIV');
              audioParent.style.textAlign = "center";
              audioParent.style.marginTop = "60px";

              audioParent.appendChild(newAudio);
              otherParentNode.appendChild(audioParent);
            }
            else {
              parentNode.innerHTML = '';
              parentNode.appendChild(newAudio);
            }

            audio = newAudio;
          }

          replaceRecordingElements();
        }
      }
    }
  })
})

observer.observe(document.body, {
  childList: true
  , subtree: true
  , attributes: false
  , characterData: false
});