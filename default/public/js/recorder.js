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
          function replaceElements() {
            var otherParentNode = document.querySelector('[title="Record"]').parentNode;
            var newBtnParent = document.createElement('DIV');

            otherParentNode.innerHTML = '';
            otherParentNode.style.height = "200px";
            otherParentNode.parentNode.style.marginLeft = "0";

            newBtnParent.style.textAlign = "center";
            newBtnParent.style.height = "50px";
            newBtnParent.style.marginTop = "70px";

            btnStartRecording = document.createElement('BUTTON');
            btnStopRecording = document.createElement('BUTTON');
            btnReleaseMicrophone = document.createElement('BUTTON');

            btnStartRecording.innerHTML = "Start";
            btnStopRecording.innerHTML = "Stop";

            btnReleaseMicrophone.style.visibility = "hidden";

            btnStartRecording.id = "record";
            btnStopRecording.id = "save";

            newBtnParent.appendChild(btnStartRecording);
            newBtnParent.appendChild(btnStopRecording);
            newBtnParent.appendChild(btnReleaseMicrophone);
            otherParentNode.appendChild(newBtnParent)

            $(".sv-description").css('color', 'rgb(64, 64, 64)');
            $("#record, #save").css('left', `${$(".footer").width() / 2 - 25}px`);

            replaceAudio();
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
              btnStartRecording.parentNode.parentNode.appendChild(audioParent);
            }
            else {
              parentNode.innerHTML = '';
              parentNode.appendChild(newAudio);
            }

            audio = newAudio;
          }

          var btnStartRecording;
          var btnStopRecording;
          var btnReleaseMicrophone;

          var audio = document.querySelector('audio');
          var finishButton = document.getElementsByClassName("sv-btn sv-footer__complete-btn")[0];
          var recorder;
          var harkMicrophone;
          var heardCough;
          var speech;

          replaceElements();

          btnStopRecording.className = "Rec";
          btnStartRecording.className = "notRec";
          btnStopRecording.style.visibility = "hidden";

          if (typeof navigator.mediaDevices === 'undefined' || !navigator.mediaDevices.getUserMedia)
            alert('Please use a native browser such as Safari or Chrome as this in-app browser is not supported.');

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
                replaceAudio(URL.createObjectURL(e.data));
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
              setTimeout(function () { btnStopRecording.click(); }, 15000);
            });
          });

          btnStopRecording.addEventListener('click', () => {
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
      }
    }
  })
})

observer.observe(document.body, {
  childList: true
  , subtree: true
  , attributes: false
  , characterData: false
})