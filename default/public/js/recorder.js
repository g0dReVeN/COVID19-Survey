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

					var audio = document.querySelector('audio');
					var finishButton = document.getElementsByClassName("sv-btn sv-footer__complete-btn")[0];

					function stopRecording() {
						if (isRecording) {
							btnStopRecording.click();
						}
					}

					finishButton.addEventListener('touchstart', function (e) {
						console.log('touchstart button event triggered');
						stopRecording();
					}, false);

					finishButton.addEventListener('touchend', function (e) {
						console.log('touchend button event triggered');
						stopRecording();
					}, false);

					finishButton.addEventListener('mousedown', function (e) {
						console.log('mousedown button event triggered');
						stopRecording();
					}, false);

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

					function captureMicrophone(callback) {
						$("#sq_122_ariaTitle").css('background-color', '');

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
						}).then(function (stream) {
							ctx = new AudioContext();
							var source = ctx.createMediaStreamSource(stream);
							var dest = ctx.createMediaStreamDestination();
							var gainNode = ctx.createGain();

							source.connect(gainNode);
							gainNode.connect(dest);
							gainNode.gain.value = 0.8;
							callback(dest.stream);
						}).catch(function (error) {
							alert('Error: ' + error);
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

					function stopRecordingCallback() {
						var internalRecorder = recorder.getInternalRecorder();
						var leftchannel = internalRecorder.leftchannel;
						var rightchannel = internalRecorder.rightchannel;

						mergeLeftRightBuffers({
							desiredSampRate: internalRecorder.desiredSampRate,
							sampleRate: internalRecorder.sampleRate,
							numberOfAudioChannels: internalRecorder.numberOfAudioChannels,
							internalInterleavedLength: internalRecorder.recordingLength,
							leftBuffers: leftchannel,
							rightBuffers: internalRecorder.numberOfAudioChannels === 1 ? [] : rightchannel
						}, function (buffer, view) {
							blob = new Blob([buffer], {
								type: 'audio/wav'
							});
							replaceAudio(URL.createObjectURL(blob));
							if (heardCough) {
								recorderResult = blob;
								$("#sq_122_ariaTitle").css('background-color', 'rgba(26, 179, 148, 0.2)');
							} else {
								recorderResult = -1;
							}
						});

						btnStartRecording.disabled = false;

						if (isSafari) {
							click(btnReleaseMicrophone);
						}
					}

					var isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveOrOpenBlob || !!navigator.msSaveBlob);
					var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

					var ctx;
					var recorder;
					var microphone;

					var btnStartRecording = document.createElement('BUTTON');
					var btnStopRecording = document.createElement('BUTTON');
					var btnReleaseMicrophone = document.createElement('BUTTON');

					var heardCough;
					var speech;
					var blob;
					var isRecording = false;

					replaceElements();

					btnStopRecording.className = "Rec";
					btnStartRecording.className = "notRec";
					btnStopRecording.style.visibility = "hidden";

					btnStartRecording.onclick = function () {
						isRecording = true;
						recorderResult = null;
						blob = null;
						heardCough = false;
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
							recorderType: StereoAudioRecorder
						};

						if (recorder) {
							recorder.destroy();
							recorder = null;
						}

						speech = hark(microphone, harkOptions);

						recorder = RecordRTC(microphone, options);

						recorder.setRecordingDuration(15000).onRecordingStopped(() => {
							btnStopRecording.click()
						});

						recorder.startRecording();

						var harkOptions = {
							threshold: -40
						};

						speech.on('speaking', function () {
							console.log('cough detected');
							heardCough = true;
						});

						btnStopRecording.disabled = false;
						btnStopRecording.className = "Rec";
						btnStartRecording.style.visibility = "hidden";
						btnStopRecording.style.visibility = "visible";
					};

					btnStopRecording.onclick = function () {
						isRecording = false;
						this.disabled = true;
						recorder.stopRecording(stopRecordingCallback);
						btnStopRecording.className = "notRec";
						btnStopRecording.style.visibility = "hidden";
						btnStartRecording.style.visibility = "visible";
						finishButton.style.display = "";
					};

					btnReleaseMicrophone.onclick = function () {
						this.disabled = true;
						btnStartRecording.disabled = false;

						if (microphone) {
							ctx.close().then(() => {
								microphone.stop();
								microphone = null;
								speech.stop();
								speech = null;
							});
						}
					};

					function click(el) {
						el.disabled = false;
						var evt = document.createEvent('Event');
						evt.initEvent('click', true, true);
						el.dispatchEvent(evt);
					}

					function mergeLeftRightBuffers(config, callback) {
						function mergeAudioBuffers(config, cb) {
							var numberOfAudioChannels = config.numberOfAudioChannels;

							// todo: "slice(0)" --- is it causes loop? Should be removed?
							var leftBuffers = config.leftBuffers.slice(0);
							var rightBuffers = config.rightBuffers.slice(0);
							var sampleRate = config.sampleRate;
							var internalInterleavedLength = config.internalInterleavedLength;
							var desiredSampRate = config.desiredSampRate;

							if (numberOfAudioChannels === 2) {
								leftBuffers = mergeBuffers(leftBuffers, internalInterleavedLength);
								rightBuffers = mergeBuffers(rightBuffers, internalInterleavedLength);
								if (desiredSampRate) {
									leftBuffers = interpolateArray(leftBuffers, desiredSampRate, sampleRate);
									rightBuffers = interpolateArray(rightBuffers, desiredSampRate, sampleRate);
								}
							}

							if (numberOfAudioChannels === 1) {
								leftBuffers = mergeBuffers(leftBuffers, internalInterleavedLength);
								if (desiredSampRate) {
									leftBuffers = interpolateArray(leftBuffers, desiredSampRate, sampleRate);
								}
							}

							if (desiredSampRate) {
								sampleRate = desiredSampRate;
							}

							function interpolateArray(data, newSampleRate, oldSampleRate) {
								var fitCount = Math.round(data.length * (newSampleRate / oldSampleRate));
								var newData = [];
								var springFactor = Number((data.length - 1) / (fitCount - 1));
								newData[0] = data[0]; // for new allocation
								for (var i = 1; i < fitCount - 1; i++) {
									var tmp = i * springFactor;
									var before = Number(Math.floor(tmp)).toFixed();
									var after = Number(Math.ceil(tmp)).toFixed();
									var atPoint = tmp - before;
									newData[i] = linearInterpolate(data[before], data[after], atPoint);
								}
								newData[fitCount - 1] = data[data.length - 1]; // for new allocation
								return newData;
							}

							function linearInterpolate(before, after, atPoint) {
								return before + (after - before) * atPoint;
							}

							function mergeBuffers(channelBuffer, rLength) {
								var result = new Float64Array(rLength);
								var offset = 0;
								var lng = channelBuffer.length;

								for (var i = 0; i < lng; i++) {
									var buffer = channelBuffer[i];
									result.set(buffer, offset);
									offset += buffer.length;
								}

								return result;
							}

							function interleave(leftChannel, rightChannel) {
								var length = leftChannel.length + rightChannel.length;

								var result = new Float64Array(length);

								var inputIndex = 0;

								for (var index = 0; index < length;) {
									result[index++] = leftChannel[inputIndex];
									result[index++] = rightChannel[inputIndex];
									inputIndex++;
								}
								return result;
							}

							function writeUTFBytes(view, offset, string) {
								var lng = string.length;
								for (var i = 0; i < lng; i++) {
									view.setUint8(offset + i, string.charCodeAt(i));
								}
							}

							// interleave both channels together
							var interleaved;

							if (numberOfAudioChannels === 2) {
								interleaved = interleave(leftBuffers, rightBuffers);
							}

							if (numberOfAudioChannels === 1) {
								interleaved = leftBuffers;
							}

							var interleavedLength = interleaved.length;

							// create wav file
							var resultingBufferLength = 44 + interleavedLength * 2;

							var buffer = new ArrayBuffer(resultingBufferLength);

							var view = new DataView(buffer);

							// RIFF chunk descriptor/identifier 
							writeUTFBytes(view, 0, 'RIFF');

							// RIFF chunk length
							view.setUint32(4, 44 + interleavedLength * 2, true);

							// RIFF type 
							writeUTFBytes(view, 8, 'WAVE');

							// format chunk identifier 
							// FMT sub-chunk
							writeUTFBytes(view, 12, 'fmt ');

							// format chunk length 
							view.setUint32(16, 16, true);

							// sample format (raw)
							view.setUint16(20, 1, true);

							// stereo (2 channels)
							view.setUint16(22, numberOfAudioChannels, true);

							// sample rate 
							view.setUint32(24, sampleRate, true);

							// byte rate (sample rate * block align)
							view.setUint32(28, sampleRate * 2, true);

							// block align (channel count * bytes per sample) 
							view.setUint16(32, numberOfAudioChannels * 2, true);

							// bits per sample 
							view.setUint16(34, 16, true);

							// data sub-chunk
							// data chunk identifier 
							writeUTFBytes(view, 36, 'data');

							// data chunk length 
							view.setUint32(40, interleavedLength * 2, true);

							// write the PCM samples
							var lng = interleavedLength;
							var index = 44;
							var volume = 1;
							for (var i = 0; i < lng; i++) {
								view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
								index += 2;
							}

							if (cb) {
								return cb({
									buffer: buffer,
									view: view
								});
							}

							postMessage({
								buffer: buffer,
								view: view
							});
						}

						if (!isChrome) {
							mergeAudioBuffers(config, function (data) {
								callback(data.buffer, data.view);
							});
							return;
						}


						var webWorker = processInWebWorker(mergeAudioBuffers);

						webWorker.onmessage = function (event) {
							callback(event.data.buffer, event.data.view);

							// release memory
							URL.revokeObjectURL(webWorker.workerURL);
						};

						webWorker.postMessage(config);
					}

					function processInWebWorker(_function) {
						var workerURL = URL.createObjectURL(new Blob([_function.toString(),
						';this.onmessage =  function (eee) {' + _function.name + '(eee.data);}'
						], {
							type: 'application/javascript'
						}));

						var worker = new Worker(workerURL);
						worker.workerURL = workerURL;
						return worker;
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