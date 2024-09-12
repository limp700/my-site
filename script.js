 $(document).ready(function() {
            var lastfmData = {
                baseURL: 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=',
                user: 'riverspinky',
                api_key: '831c7a87085459117c917b6f7f36ca48',
                additional: '&format=json&limit=1',
            };

            var getSetLastFM = function () {
                var url = lastfmData.baseURL + lastfmData.user + '&api_key=' + lastfmData.api_key + lastfmData.additional + '&' + new Date().getTime();
                $.ajax({
                    type: 'GET',
                    url: url,
                    dataType: 'json',
                    success: function (resp) {
                        var trackArt = document.getElementById("trackart");
                        var trackInfo = document.getElementById("trackinfo");
                        var trackInfoContainer = document.getElementById("trackinfo-container");
                        var listeningStatus = document.getElementById("listening-status");
                        var liveNowImage = document.getElementById("live-now-image");

                        trackArt.style.display = "none";
                        trackInfoContainer.style.display = "none";
                        liveNowImage.style.display = "none";

                        var recentTrack = resp.recenttracks.track[0];
                        if (recentTrack && recentTrack['@attr'] && recentTrack['@attr'].nowplaying === 'true') {
                            listeningStatus.innerHTML = " Now playing...";
                            trackArt.style.display = "block";
                            trackInfoContainer.style.display = "block";
                            liveNowImage.style.display = "inline";

                            var artistFormatted = recentTrack.artist['#text'];
                            var trackFormatted = recentTrack.name;
                            var combinedFormatted = "♪ " + artistFormatted + " - " + trackFormatted;

                            $('#trackinfo')
                                .html(combinedFormatted)
                                .attr('title', trackFormatted + ' by ' + artistFormatted)
                                .attr('target', '_blank');

                            $('#trackart').attr('src', recentTrack.image[3]['#text']);
                        } else if (recentTrack) {
                            listeningStatus.innerHTML = "Recently listened to...";
                            trackArt.style.display = "block";
                            trackInfoContainer.style.display = "block";

                            var artistFormatted = recentTrack.artist['#text'];
                            var trackFormatted = recentTrack.name;
                            var combinedFormatted = "♪ " + artistFormatted + " - " + trackFormatted;

                            $('#trackinfo')
                                .html(combinedFormatted)
                                .attr('title', trackFormatted + ' by ' + artistFormatted)
                                .attr('target', '_blank');

                            $('#trackart').attr('src', recentTrack.image[3]['#text']);
                        }
                    },
                    error: function () {
                        $('#trackinfo').html(' ');
                        $('#trackart').attr('src', '');
                        var artistFormatted = "<img src=''> ";
                        $('#trackinfo').html(artistFormatted);
                    },
                });
            };

            // Get the new one.
            getSetLastFM();
            // Start the countdown.
            setInterval(getSetLastFM, 10 * 1000);
        });