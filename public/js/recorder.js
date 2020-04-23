let observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		if (!mutation.addedNodes) return

		for (let i = 0; i < mutation.addedNodes.length; i++) {
			let node = mutation.addedNodes[i];
			let c = node.childNodes;

			for (i = 0; i < c.length; i++) {
				if (c[i].title == "Record") {
					var audio = document.querySelector('audio');

					function replaceElements() {
						var otherParentNode = document.querySelector('[title="Record"]').parentNode;
						otherParentNode.innerHTML = '';


						btnStartRecording = document.createElement('BUTTON');
						btnStopRecording = document.createElement('BUTTON');
						btnReleaseMicrophone = document.createElement('BUTTON');

						btnStartRecording.innerHTML = "Start";
						btnStopRecording.innerHTML = "Stop";

						btnReleaseMicrophone.style.visibility = "hidden";

						btnStartRecording.title = "Record";
						btnStopRecording.title = "Save";

						otherParentNode.appendChild(btnStartRecording);
						otherParentNode.appendChild(btnStopRecording);
						otherParentNode.appendChild(btnReleaseMicrophone);
						replaceAudio();
					}

					function captureMicrophone(callback) {
						btnReleaseMicrophone.disabled = false;

						if (microphone) {
							callback(microphone);
							return;
						}

						if (typeof navigator.mediaDevices === 'undefined' || !navigator.mediaDevices.getUserMedia) {
							alert('This browser does not supports WebRTC getUserMedia API.');

							if (!!navigator.getUserMedia) {
								alert('This browser seems supporting deprecated getUserMedia API.');
							}
						}

						navigator.mediaDevices.getUserMedia({
							audio: isEdge ? true : {
								echoCancellation: false
							}
						}).then(function (mic) {
							callback(mic);
						}).catch(function (error) {
							alert('Please press the previous button then the next button and grant permission for microphone');
							console.error(error);
						});
					}

					function replaceAudio(src) {
						var newAudio = document.createElement('audio');

						newAudio.controls = true;
						newAudio.style.borderRadius = "15px";

						if (src) {
							newAudio.src = src;
						}

						var parentNode = audio.parentNode;
						console.log(parentNode);
						if (!parentNode) {
							var audioParent = document.createElement('DIV');
							audioParent.style.textAlign = "center";
							audioParent.style.marginTop = "140px";

							audioParent.appendChild(newAudio);
							btnStartRecording.parentNode.appendChild(audioParent);
						}
						else {
							parentNode.innerHTML = '';
							parentNode.appendChild(newAudio);
						}

						audio = newAudio;
					}

					function stopRecordingCallback() {
						replaceAudio(URL.createObjectURL(recorder.getBlob()));

						btnStartRecording.disabled = false;

						if (isSafari) {
							click(btnReleaseMicrophone);
						}
					}

					var isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveOrOpenBlob || !!navigator.msSaveBlob);
					var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

					var recorder; // globally accessible
					var microphone;

					var btnStartRecording = document.createElement('BUTTON');
					var btnStopRecording = document.createElement('BUTTON');
					var btnReleaseMicrophone = document.createElement('BUTTON');

					replaceElements();

					btnStopRecording.className = "Rec";
					btnStartRecording.className = "notRec";
					btnStopRecording.style.visibility = "hidden";
					btnStopRecording.parentElement.style.height = "260px";
					btnStopRecording.parentElement.parentElement.style.marginLeft = "0"

					btnStartRecording.onclick = function () {
						this.disabled = true;
						this.style.border = '';
						this.style.fontSize = '';

						if (!microphone) {
							captureMicrophone(function (mic) {
								microphone = mic;

								if (isSafari) {
									replaceAudio();

									audio.muted = true;
									audio.srcObject = microphone;

									btnStartRecording.disabled = false;

									alert('Please click the record button again to start recording!');
									return;
								}

								click(btnStartRecording);
							});
							return;
						}

						replaceAudio();

						audio.muted = true;
						audio.srcObject = microphone;

						var options = {
							type: 'audio',
							numberOfAudioChannels: isEdge ? 1 : 2,
							checkForInactiveTracks: true,
							bufferSize: 16384
						};

						if (isSafari || isEdge) {
							options.recorderType = StereoAudioRecorder;
						}

						if (navigator.platform && navigator.platform.toString().toLowerCase().indexOf('win') === -1) {
							options.sampleRate = 48000; // or 44100 or remove this line for default
						}

						if (isSafari) {
							options.sampleRate = 44100;
							options.bufferSize = 4096;
							options.numberOfAudioChannels = 2;
						}

						if (recorder) {
							recorder.destroy();
							recorder = null;
						}

						recorder = RecordRTC(microphone, options);

						recorder.startRecording();

						btnStopRecording.disabled = false;

						btnStopRecording.className = "Rec";
						btnStartRecording.style.visibility = "hidden";
						btnStopRecording.style.visibility = "visible";
					};

					btnStopRecording.onclick = function () {
						this.disabled = true;
						recorder.stopRecording(stopRecordingCallback);
						btnStopRecording.className = "notRec";
						btnStopRecording.style.visibility = "hidden";
						btnStartRecording.style.visibility = "visible";
						recorder.getDataURL(function (dataURL) {
							recorderResult = dataURL;
						});
					};

					btnReleaseMicrophone.onclick = function () {
						this.disabled = true;
						btnStartRecording.disabled = false;

						if (microphone) {
							microphone.stop();
							microphone = null;
						}
					};

					function click(el) {
						el.disabled = false; // make sure that element is not disabled
						var evt = document.createEvent('Event');
						evt.initEvent('click', true, true);
						el.dispatchEvent(evt);
					}

					break;

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