let observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		if (!mutation.addedNodes) return

		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;

		for (let i = 0; i < mutation.addedNodes.length; i++) {
			let node = mutation.addedNodes[i];
			let c = node.childNodes;

			for (i = 0; i < c.length; i++) {
				if (c[i].title == "Record") {

					var audio = document.querySelector('audio');

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

						replaceAudio();
					}

					/** Start of soundmeter implementation */

					var instantMeter = document.querySelector('#instant meter');
					// var slowMeter = document.querySelector('#slow meter');
					// var clipMeter = document.querySelector('#clip meter');

					// var instantValueDisplay = document.querySelector('#instant .value');
					// var slowValueDisplay = document.querySelector('#slow .value');
					// var clipValueDisplay = document.querySelector('#clip .value');

					try {
						window.AudioContext = window.AudioContext || window.webkitAudioContext;
						window.audioContext = new AudioContext();
					} catch (e) {
						alert('Web Audio API not supported.');
					}

					window.constraints = {
						audio: true,
						video: false
					};

					function handleSuccess(stream) {
						window.stream = stream;
						var soundMeter = window.soundMeter = new SoundMeter(window.audioContext);
						soundMeter.connectToSource(stream, function (e) {
							if (e) {
								alert(e);
								return;
							}
							setInterval(() => {
								// instantMeter.value = instantValueDisplay.innerText =
								//   soundMeter.instant.toFixed(2);
								// slowMeter.value = slowValueDisplay.innerText =
								//   soundMeter.slow.toFixed(2);
								// clipMeter.value = clipValueDisplay.innerText =
								//   soundMeter.clip;
								var soundmeterResult = soundMeter.instant.toFixed(2);
								if (coughSoundLevel < soundmeterResult)
									coughSoundLevel = soundmeterResult;
							}, 200);
						});
					}

					function handleError(error) {
						console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
					}

					/** End of soundmeter implementation */


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
								echoCancellation: true
							}
						}).then(function (mic) {
							callback(mic);
							handleSuccess(mic); // Part of soundmeter implementation
						}).catch(function (error) {
							handleError(error); // Part of soundmeter implementation
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
						});

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

					var coughSoundLevel = 0;

					var blob = null;

					replaceElements();

					btnStopRecording.className = "Rec";
					btnStartRecording.className = "notRec";
					btnStopRecording.style.visibility = "hidden";

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
							// numberOfAudioChannels: isEdge ? 1 : 2,
							// checkForInactiveTracks: true,
							// bufferSize: 16384
							recorderType: StereoAudioRecorder
						};

						// if (isSafari || isEdge) {
						//   options.recorderType = StereoAudioRecorder;
						// }

						// if (navigator.platform && navigator.platform.toString().toLowerCase().indexOf('win') === -1) {
						//   options.sampleRate = 48000; // or 44100 or remove this line for default
						// }

						// if (isSafari) {
						//   options.sampleRate = 44100;
						//   options.bufferSize = 4096;
						//   options.numberOfAudioChannels = 2;
						// }

						if (recorder) {
							recorder.destroy();
							recorder = null;
						}

						recorder = RecordRTC(microphone, options);

						recorder.setRecordingDuration(5000).onRecordingStopped(() => {
							btnStopRecording.click()
						});

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
						if (coughSoundLevel >= 0.15)
							recorderResult = blob;
						else
							recorderResult = -1;
						btnReleaseMicrophone.click();
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
								//var newData = new Array();
								var newData = [];
								//var springFactor = new Number((data.length - 1) / (fitCount - 1));
								var springFactor = Number((data.length - 1) / (fitCount - 1));
								newData[0] = data[0]; // for new allocation
								for (var i = 1; i < fitCount - 1; i++) {
									var tmp = i * springFactor;
									//var before = new Number(Math.floor(tmp)).toFixed();
									//var after = new Number(Math.ceil(tmp)).toFixed();
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
							// its Microsoft Edge
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