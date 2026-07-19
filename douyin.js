(async () => {
    'use strict';

    // ++ START PANEL IDs ++
    const PANEL_ID = 'douyin-downloader-panel-nxthanh';
    const HEADER_ID = `${PANEL_ID}-header`;
    const HIDE_BTN_ID = `${PANEL_ID}-hide-btn`;
    const VIDEO_PREVIEW_MODAL_ID = `${PANEL_ID}-video-preview-modal`;
    const DETAIL_POPUP_ID = `${PANEL_ID}-detail-popup`;
    const OVERLAY_ID = `${PANEL_ID}-overlay`;
    const CHECKLIST_AREA_ID = `${PANEL_ID}-checklist-area`;
    const CHECKLIST_HEADER_ID = `${PANEL_ID}-checklist-header`;
    const CHECK_BTN_ID = `${PANEL_ID}-check-btn`;
    const START_BTN_ID = `${PANEL_ID}-start-btn`;
    const PAUSE_BTN_ID = `${PANEL_ID}-pause-btn`;
    const CANCEL_BTN_ID = `${PANEL_ID}-cancel-btn`;
    const RESTART_BTN_ID = `${PANEL_ID}-restart-btn`;
    const CLEAR_HISTORY_BTN_ID = `${PANEL_ID}-clear-history-btn`;
    const DOWNLOAD_ERRORS_BTN_ID = `${PANEL_ID}-download-errors-btn`;
    const YOUTUBE_BTN_ID = `${PANEL_ID}-youtube-btn`;
    const FACEBOOK_BTN_ID = `${PANEL_ID}-facebook-btn`;
    const GITHUB_BTN_ID = `${PANEL_ID}-github-btn`;
    const DONATE_BTN_ID = `${PANEL_ID}-donate-btn`;
    const DONATE_POPUP_ID = `${PANEL_ID}-donate-popup`;
    const EXPORT_LINKS_BTN_ID = `${PANEL_ID}-export-links-btn`;
    const SELECT_ALL_CB_ID = `${PANEL_ID}-select-all-cb`;
    const ONLY_NEW_CB_ID = `${PANEL_ID}-only-new-cb`;
    const VIDEO_MAX_INPUT_ID = `${PANEL_ID}-video-max`;
    const MIN_LIKES_INPUT_ID = `${PANEL_ID}-min-likes`;
    const MAX_LIKES_INPUT_ID = `${PANEL_ID}-max-likes`;
    const DATE_START_INPUT_ID = `${PANEL_ID}-date-start`;
    const DATE_END_INPUT_ID = `${PANEL_ID}-date-end`;
    const DURATION_MIN_INPUT_ID = `${PANEL_ID}-duration-min`;
    const DURATION_MAX_INPUT_ID = `${PANEL_ID}-duration-max`;
    const ORIENTATION_NGANG_CB_ID = `${PANEL_ID}-orientation-ngang-cb`;
    const ORIENTATION_DOC_CB_ID = `${PANEL_ID}-orientation-doc-cb`;
    const ORIENTATION_VUONG_CB_ID = `${PANEL_ID}-orientation-vuong-cb`;
    const AUTO_RETRY_CB_ID = `${PANEL_ID}-auto-retry-cb`;
    const MAX_RETRIES_INPUT_ID = `${PANEL_ID}-max-retries`;
    const CONCURRENT_DOWNLOADS_INPUT_ID = `${PANEL_ID}-concurrent-downloads`;
    const LOW_RAM_MODE_CB_ID = `${PANEL_ID}-low-ram-mode-cb`;
    const FILENAME_FORMAT_TITLE_ID = `${PANEL_ID}-filename-format-title`;
    const FILENAME_FORMAT_COUNTER_ID = `${PANEL_ID}-filename-format-counter`;
    const FILENAME_FORMAT_DATE_ID = `${PANEL_ID}-filename-format-date`;
    const STATUS_AREA_ID = `${PANEL_ID}-status-area`;
    const PROGRESS_BAR_ID = `${PANEL_ID}-progress-bar`;
    const PROGRESS_TEXT_ID = `${PANEL_ID}-progress-text`;
    const STATS_DIV_ID = `${PANEL_ID}-header-stats`;
    // -- END PANEL IDs --

    // ++ START CSS CLASSES ++
    const VIDEO_CB_CLASS = `${PANEL_ID}-video-cb`;
    const SORT_INDICATOR_CLASS = `${PANEL_ID}-sort-indicator`;
    const DESC_CELL_CLASS = `${PANEL_ID}-desc-cell`;
    const ID_CELL_CLASS = `${PANEL_ID}-id-cell`;
    const RETRY_BTN_CLASS = `${PANEL_ID}-retry-btn`;
    const PROGRESS_STATUS_CLASS = `${PANEL_ID}-progress-status`;
    // -- END CSS CLASSES --

    const YOUTUBE_CHANNEL_LINK = "https://www.youtube.com/@thanhxnt4";
    const FACEBOOK_CHANNEL_LINK = "https://www.facebook.com/nguyen.thanh.749031";
    const GITHUB_CHANNEL_LINK = "https://github.com/ngxuanthanh1303/";
    const LOCALSTORAGE_KEY_HISTORY = 'douyin_downloaded_history_nxthanh';

    const MAX_FILENAME_LENGTH = 50;
    const DEFAULT_MAX_RETRIES = 2;
    const ID_TRUNCATE_LENGTH = 5;
    const DESC_TRUNCATE_LENGTH = 10;

    let panelElement = null;
    let statusAreaElement = null;
    let progressBarElement = null;
    let progressTextElement = null;
    let checkButtonElement = null;
    let startButtonElement = null;
    let pauseButtonElement = null;
    let cancelButtonElement = null;
    let restartButtonElement = null;
    let hideButtonElement = null;
    let clearHistoryButtonElement = null;
    let downloadErrorsButtonElement = null;
    let youtubeButtonElement = null;
    let facebookButtonElement = null;
    let githubButtonElement = null;
    let donateButtonElement = null;
    let donatePopupElement = null;
    let exportLinksButtonElement = null;

    let videoMaxLimitInputElement = null;
    let minLikesInputElement = null;
    let maxLikesInputElement = null;
    let dateStartInputElement = null;
    let dateEndInputElement = null;
    let durationMinInputElement = null;
    let durationMaxInputElement = null;
    let orientationNgangCheckboxElement = null;
    let orientationDocCheckboxElement = null;
    let orientationVuongCheckboxElement = null;

    let autoRetryCheckboxElement = null;
    let maxRetriesInputElement = null;
    let concurrentDownloadsInputElement = null;
    let lowRamCheckboxElement = null;
    let onlyNewCheckboxElement = null;
    let selectAllCheckboxElement = null;
    
    let filenameFormatTitleRadioElement = null;
    let filenameFormatCounterRadioElement = null;
    let filenameFormatDateRadioElement = null;

    let checklistAreaElement = null;
    let checklistHeaderElement = null;
    let statsDivElement = null;
    let videoPreviewModalElement = null;
    let videoPreviewPlayerElement = null;
    let detailPopupElement = null;
    let overlayElement = null;

    let isChecking = false;
    let isRunning = false;
    let isPaused = false;
    let isExiting = false;
    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let checkedVideoList = [];
    let downloadQueue = [];
    let downloadedHistory = new Set();
    let errorLog = [];
    let currentSortColumn = 'createTime';
    let currentSortDirection = 'desc';
    let startTime = 0;
    let status = { checkedAPI: 0, checkedValid: 0, checkedSkippedFilter: 0, totalToDownload: 0, downloadedSuccess: 0, downloadedFailed: 0, downloadedSkipped: 0, downloadedRetries: 0, minLikes: Infinity, maxLikes: -Infinity, };

    // --- HELPER FUNCTIONS ---
    const waitforme = (millisec) => { return new Promise(resolve => { if (isExiting) { resolve(); return; } if (isPaused) { const interval = setInterval(() => { if (!isPaused || isExiting) { clearInterval(interval); resolve(); } }, 100); } else { if (isExiting) { resolve(); } else { setTimeout(() => { resolve('') }, millisec); } } }); };
    const fetchVideoBatch = async (sec_user_id, max_cursor) => {
        const apiUrl = `https://www.douyin.com/aweme/v1/web/aweme/post/?device_platform=webapp&aid=6383&channel=channel_pc_web&sec_user_id=${sec_user_id}&max_cursor=${max_cursor}&count=20`;
        updateStatus(`Đang lấy video người dùng ${sec_user_id.substring(0, 10)}...`);
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchTimeout = 15000;
        let exitCheckInterval;
        try {
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => { controller.abort(); reject(new Error('API request timed out')); }, fetchTimeout));
            const exitPromise = new Promise((_, reject) => { exitCheckInterval = setInterval(() => { if (isExiting) { clearInterval(exitCheckInterval); controller.abort(); reject(new Error('Fetch aborted by user')); } }, 100); });
            const fetchPromise = fetch(apiUrl, {
                signal,
                headers: { "accept": "application/json, text/plain, */*", "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7", "sec-ch-ua": "\"Chromium\";v=\"118\", \"Google Chrome\";v=\"118\", \"Not=A?Brand\";v=\"99\"", "sec-ch-ua-mobile": "?0", "sec-ch-ua-platform": "\"Windows\"", "sec-fetch-dest": "empty", "sec-fetch-mode": "cors", "sec-fetch-site": "same-origin", },
                referrerPolicy: "strict-origin-when-cross-origin",
                method: "GET",
                mode: "cors",
                credentials: "include"
            });
            const response = await Promise.race([fetchPromise, timeoutPromise, exitPromise]);
            clearInterval(exitCheckInterval);
            if (!response.ok) {
                let errorBody = `Trạng thái: ${response.status} ${response.statusText}`;
                try { const errorText = await response.text(); errorBody += `\nNội dung: ${errorText.substring(0, 500)}`; } catch (e) {}
                throw new Error(`Lỗi HTTP API:\n${errorBody}`);
            }
            const data = await response.json();
            if (!data || !Array.isArray(data.aweme_list)) {
                throw new Error("Định dạng phản hồi API không mong đợi.");
            }
            return data;
        } catch (error) {
            if (exitCheckInterval) clearInterval(exitCheckInterval);
            const errorType = error.name === 'AbortError' ? (isExiting ? 'UserCancellation' : 'Timeout') : 'FetchError';
            if (errorType !== 'UserCancellation') {
                logError(`Lỗi API (Người dùng: ${sec_user_id}, Con trỏ: ${max_cursor})`, error, errorType);
                updateStatus(`Lỗi API người dùng ${sec_user_id.substring(0,10)} (${errorType})... Đang thử lại...`, true);
            } else {
                updateStatus("Đã hủy bởi người dùng.", false, true);
            }
            await waitforme(isExiting ? 100 : 5000);
            return null;
        }
    };
    const downloadVideoBlob = async (url, aweme_id, onProgress) => {
        let reader = null;
        try {
            const response = await fetch(url, {
                headers: { "accept": "*/*", "accept-language": "vi,en-US;q=0.9,en;q=0.8", "range": "bytes=0-", "sec-ch-ua": "\"Chromium\";v=\"118\", \"Google Chrome\";v=\"118\", \"Not=A?Brand\";v=\"99\"", "sec-ch-ua-mobile": "?0", "sec-ch-ua-platform": "\"Windows\"", "sec-fetch-dest": "video", "sec-fetch-mode": "cors", "sec-fetch-site": "cross-site" },
                referrer: "https://www.douyin.com/",
                referrerPolicy: "strict-origin-when-cross-origin",
                method: "GET",
                mode: "cors",
                credentials: "omit"
            });
            if (!response.ok) { throw new Error(`Lỗi HTTP ${response.status} ${response.statusText} khi tải video ID ${aweme_id}`); }
            if (!response.body) { throw new Error(`Không có nội dung phản hồi (ReadableStream) cho video ID ${aweme_id}`); }
            const contentLength = response.headers.get('Content-Length');
            const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;
            let receivedBytes = 0;
            const chunks = [];
            reader = response.body.getReader();
            onProgress(0, totalBytes);
            while (true) {
                while (isPaused && !isExiting) { await waitforme(500); }
                if (isExiting) { logError(`Tải bị hủy (Thoát) cho ID: ${aweme_id}`, null, 'UserCancellation'); reader.cancel('User exited').catch(e => {}); return null; }

                try {
                    if (isExiting) { reader.cancel('User exited').catch(e => {}); return null; }
                    const { done, value } = await reader.read();
                    if (done) break;
                    chunks.push(value);
                    receivedBytes += value.length;
                    if (totalBytes > 0) {
                        const progress = Math.floor((receivedBytes / totalBytes) * 100);
                        onProgress(progress, totalBytes);
                    }
                } catch (streamError) {
                    if (isExiting) { return null; }
                    logError(`Lỗi luồng khi tải ID ${aweme_id}`, streamError, 'DownloadStreamError');
                    onProgress(-1, totalBytes);
                    return null;
                }
            }
            onProgress(100, totalBytes);
            if (receivedBytes === 0 && chunks.length === 0) { logError(`Tải ID ${aweme_id} xong nhưng 0 byte.`, null, 'DownloadError'); return null; }
            const blob = new Blob(chunks, { type: response.headers.get('Content-Type') || 'video/mp4' });
            chunks.length = 0; // Clear chunks array immediately
            return blob;
        } catch (error) {
            if (isExiting) { return null; }
            logError(`Lỗi tải video ID ${aweme_id} từ URL: ${url}`, error, 'DownloadFetchError');
            onProgress(-1, 0);
            return null;
        } finally {
            if (reader && !reader.closed) { reader.cancel('Cleanup').catch(e => {}); }
        }
    };
    const triggerDownload = (blob, filename) => { try { const url = window.URL.createObjectURL(blob); const a = document.createElement("a"); a.style.display = 'none'; a.href = url; a.download = filename; document.body.appendChild(a); a.click(); setTimeout(() => { window.URL.revokeObjectURL(url); if (a.parentNode) a.remove(); blob = null; }, 100); } catch (error) { logError(`Lỗi kích hoạt tải file ${filename}`, error, 'DownloadTriggerError'); updateStatus(`Lỗi tạo link tải file ${filename}`, true); } };
    const sanitizeFilename = (desc) => { if (!desc) return 'no_desc'; let cleanDesc = desc.replace(/[<>:"\/\\|?*\x00-\x1F]/g, '_').replace(/[\s\.]+/g, ' ').replace(/^\.+|\.+$/g, '').trim(); if (cleanDesc.length > MAX_FILENAME_LENGTH) { const half = Math.floor(MAX_FILENAME_LENGTH / 2) - 2; cleanDesc = `${cleanDesc.substring(0, half)}...${cleanDesc.substring(cleanDesc.length - half)}`; } return cleanDesc || 'empty_desc'; };
    const formatTimestamp = (timestamp) => { if (!timestamp || isNaN(timestamp)) return 'N/A'; try { const date = new Date(timestamp * 1000); const day = String(date.getDate()).padStart(2, '0'); const month = String(date.getMonth() + 1).padStart(2, '0'); const year = date.getFullYear(); const hours = String(date.getHours()).padStart(2, '0'); const minutes = String(date.getMinutes()).padStart(2, '0'); return `${day}/${month}/${year} ${hours}:${minutes}`; } catch (e) { return 'Invalid Date'; } };
    const formatTimestampForFilename = (timestamp) => {
        if (!timestamp || isNaN(timestamp)) return 'no_date';
        try {
            const date = new Date(timestamp * 1000);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
        } catch (e) {
            return 'invalid_date';
        }
    };
    const formatDuration = (seconds) => {
        if (seconds === null || isNaN(seconds) || seconds < 0) return 'N/A';
        const totalSeconds = Math.round(seconds);
        const minutes = Math.floor(totalSeconds / 60);
        const remainingSeconds = totalSeconds % 60;
        const paddedMinutes = String(minutes).padStart(2, '0');
        const paddedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${paddedMinutes}p${paddedSeconds}s`;
    };
    const formatStatNumber = (num) => { if (num === null || num === undefined || isNaN(num)) return 'N/A'; if (num < 1000) return num.toString(); if (num < 1000000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'; return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'; };
    const formatBytes = (bytes, decimals = 2) => { if (bytes === null || bytes < 0 || isNaN(bytes)) return 'N/A'; if (bytes === 0) return '0 Bytes'; const k = 1024; const dm = decimals < 0 ? 0 : decimals; const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']; const i = bytes < 1 ? 0 : Math.floor(Math.log(bytes) / Math.log(k)); const index = Math.min(i, sizes.length - 1); return parseFloat((bytes / Math.pow(k, index)).toFixed(dm)) + ' ' + sizes[index]; };
    const logError = (message, errorDetails = null, errorType = 'GeneralError') => {
        const timestamp = new Date().toISOString();
        let details = '';
        if (errorDetails) {
            if (errorDetails instanceof Error) { details = `${errorDetails.name}: ${errorDetails.message}\n${errorDetails.stack}`; }
            else if (typeof errorDetails === 'object') { try { details = JSON.stringify(errorDetails, null, 2); } catch (e) { details = "[Could not stringify error object]"; } }
            else { details = String(errorDetails); }
        }
        console.error(`[DouyinDL Error][${errorType}] ${timestamp} - ${message}`, errorDetails);
        errorLog.push({ timestamp, type: errorType, message, details });
        if (downloadErrorsButtonElement) {
            downloadErrorsButtonElement.disabled = false;
            downloadErrorsButtonElement.title = `Có ${errorLog.length} lỗi. Tải log.`;
            downloadErrorsButtonElement.style.color = '#ffc107';
            downloadErrorsButtonElement.style.fontWeight = 'bold';
        }
        checkApiStatus();
    };
    const updateStatus = (text, isError = false, isPausedMsg = false) => {
        if (statusAreaElement) {
            statusAreaElement.textContent = text;
            statusAreaElement.style.color = isError ? '#dc3545' : (isPausedMsg ? '#ff9800' : '#333');
            statusAreaElement.title = text;
        }
    };
    const updateOverallProgress = () => {
        if (!progressBarElement || !progressTextElement || !progressBarElement.parentElement) return;
        const currentProgress = status.downloadedSuccess + status.downloadedFailed + status.downloadedSkipped;
        const total = status.totalToDownload + status.downloadedSkipped;
        const percentage = total > 0 ? Math.min(100, Math.max(0, Math.floor((currentProgress / total) * 100))) : 0;
        progressBarElement.style.width = `${percentage}%`;
        progressTextElement.textContent = `Tổng thể: ${currentProgress} / ${total} (${percentage}%)`;
        progressBarElement.parentElement.style.display = 'block';
    };
    const resetState = () => {
        isChecking = isRunning = isPaused = false;
        checkedVideoList = [];
        downloadQueue = [];
        errorLog = [];
        currentSortColumn = 'createTime';
        currentSortDirection = 'desc';
        startTime = 0;
        status = { checkedAPI: 0, checkedValid: 0, checkedSkippedFilter: 0, totalToDownload: 0, downloadedSuccess: 0, downloadedFailed: 0, downloadedSkipped: 0, downloadedRetries: 0, minLikes: Infinity, maxLikes: -Infinity };
        if (checklistAreaElement) checklistAreaElement.innerHTML = 'Chưa có video nào.';
        if (progressBarElement?.parentElement) { progressBarElement.style.width = '0%'; progressBarElement.parentElement.style.display = 'none'; }
        if (progressTextElement) progressTextElement.textContent = '';
        if (downloadErrorsButtonElement) { downloadErrorsButtonElement.disabled = true; downloadErrorsButtonElement.title = 'Chưa có lỗi.'; applyButtonStyle(downloadErrorsButtonElement, 'warning-outline'); }
        updateSelectAllState();
        resetUIState(false, false);
        updateSortIndicators();
    };
    const resetUIState = (checking, downloading) => {
        isChecking = checking;
        isRunning = downloading;

        if (!checkButtonElement) return;

        try {
            const anyProcessRunning = checking || downloading;
            const shouldDisableMainButtons = anyProcessRunning;

            checkButtonElement.disabled = shouldDisableMainButtons;
            checkButtonElement.textContent = checking ? '🔍 Đang Kiểm tra...' : '🔍 Kiểm tra Video';
            
            const selectedCount = getSelectedVideoIds().length;
            startButtonElement.disabled = shouldDisableMainButtons || selectedCount === 0;
            startButtonElement.textContent = downloading ? '🚀 Đang Tải...' : `🚀 Tải (${selectedCount}) Mục Đã Chọn`;
            if (selectedCount === 0 && !anyProcessRunning && !shouldDisableMainButtons) {
                startButtonElement.textContent = '🚀 Tải Mục Đã Chọn';
            }

            pauseButtonElement.disabled = !anyProcessRunning;
            pauseButtonElement.textContent = isPaused ? '▶️ Tiếp tục' : '⏸️ Tạm dừng';
            applyButtonStyle(pauseButtonElement, 'warning');
            if (!pauseButtonElement.disabled && isPaused) {
                pauseButtonElement.style.backgroundColor = '#28a745';
                pauseButtonElement.style.borderColor = '#28a745';
                pauseButtonElement.style.color = '#fff';
            }

            cancelButtonElement.disabled = !anyProcessRunning;
            restartButtonElement.disabled = shouldDisableMainButtons;
            clearHistoryButtonElement.disabled = shouldDisableMainButtons;
            
            exportLinksButtonElement.disabled = shouldDisableMainButtons || selectedCount === 0;

            downloadErrorsButtonElement.disabled = errorLog.length === 0 || shouldDisableMainButtons;
            if (!downloadErrorsButtonElement.disabled) {
                downloadErrorsButtonElement.title = `Có ${errorLog.length} lỗi. Tải log.`;
                downloadErrorsButtonElement.style.color = '#ffc107';
                downloadErrorsButtonElement.style.fontWeight = 'bold';
            } else {
                downloadErrorsButtonElement.title = errorLog.length === 0 ? 'Chưa có lỗi.' : 'Vô hiệu hóa khi đang chạy.';
            }

            videoMaxLimitInputElement.disabled = shouldDisableMainButtons;
            minLikesInputElement.disabled = shouldDisableMainButtons;
            maxLikesInputElement.disabled = shouldDisableMainButtons;
            dateStartInputElement.disabled = shouldDisableMainButtons;
            dateEndInputElement.disabled = shouldDisableMainButtons;
            durationMinInputElement.disabled = shouldDisableMainButtons;
            durationMaxInputElement.disabled = shouldDisableMainButtons;
            orientationNgangCheckboxElement.disabled = shouldDisableMainButtons;
            orientationDocCheckboxElement.disabled = shouldDisableMainButtons;
            orientationVuongCheckboxElement.disabled = shouldDisableMainButtons;

            onlyNewCheckboxElement.disabled = shouldDisableMainButtons;
            autoRetryCheckboxElement.disabled = shouldDisableMainButtons;
            maxRetriesInputElement.disabled = shouldDisableMainButtons;
            concurrentDownloadsInputElement.disabled = shouldDisableMainButtons;
            
            filenameFormatTitleRadioElement.disabled = shouldDisableMainButtons;
            filenameFormatCounterRadioElement.disabled = shouldDisableMainButtons;
            filenameFormatDateRadioElement.disabled = shouldDisableMainButtons;

            youtubeButtonElement.disabled = false;
            facebookButtonElement.disabled = false;
            if (githubButtonElement) githubButtonElement.disabled = false;
            if (donateButtonElement) donateButtonElement.disabled = false;
            if (selectAllCheckboxElement) updateSelectAllState();

            // Low RAM Mode check
            if (lowRamCheckboxElement && concurrentDownloadsInputElement) {
                 if (lowRamCheckboxElement.checked) {
                     concurrentDownloadsInputElement.value = '1';
                     concurrentDownloadsInputElement.disabled = true;
                 } else {
                     concurrentDownloadsInputElement.disabled = shouldDisableMainButtons;
                 }
            }


        } catch (error) {
            logError("Lỗi resetUIState", error, 'UIError');
        }
    };
    const checkApiStatus = () => {
        if (statusAreaElement) {
            const lastError = errorLog.length > 0 ? errorLog[errorLog.length - 1] : null;
            if (lastError && !statusAreaElement.textContent.startsWith('Lỗi nghiêm trọng')) {
                const errorMsgLower = lastError.message.toLowerCase();
                let statusMsg = `Lỗi (${lastError.type || 'Tổng quát'}): ${lastError.message.split('\n')[0]}...`;
                if (errorMsgLower.includes('403') || errorMsgLower.includes('forbidden')) { statusMsg = 'Lỗi API (403): Bị từ chối.'; }
                else if (errorMsgLower.includes('404')) { statusMsg = 'Lỗi API (404): Không tìm thấy.'; }
                else if (errorMsgLower.includes('failed to fetch') || errorMsgLower.includes('networkerror')) { statusMsg = 'Lỗi Mạng: Không thể kết nối.'; }
                else if (errorMsgLower.includes('invalid json')) { statusMsg = 'Lỗi API: Phản hồi không hợp lệ.'; }
                else if (errorMsgLower.includes('rate limit')) { statusMsg = 'Lỗi API: Quá nhiều yêu cầu.'; }
                else if (errorMsgLower.includes('timeout')) { statusMsg = 'Lỗi API: Yêu cầu hết thời gian chờ.'; }
                updateStatus(statusMsg, true);
            }
        }
    };
    const parseDateString = (dateStr) => { // DD/MM/YYYY
        if (!dateStr || !/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) { return null; }
        const parts = dateStr.split('/');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        const dateObj = new Date(year, month, day);
        if (dateObj.getFullYear() !== year || dateObj.getMonth() !== month || dateObj.getDate() !== day) { return null; }
        return dateObj;
    };
    const createUI = () => {
        if (document.getElementById(PANEL_ID)) {
            try {
                document.removeEventListener('keydown', handleGlobalKeyDown);
                document.getElementById(PANEL_ID).remove();
            } catch(e) { console.warn("Lỗi khi gỡ panel hiện có:", e); }
        }
        
        panelElement = null; statusAreaElement = null; progressBarElement = null; progressTextElement = null;
        checkButtonElement = null; startButtonElement = null; pauseButtonElement = null; cancelButtonElement = null;
        restartButtonElement = null; hideButtonElement = null; clearHistoryButtonElement = null;
        downloadErrorsButtonElement = null; youtubeButtonElement = null;
        facebookButtonElement = null; githubButtonElement = null; donateButtonElement = null; exportLinksButtonElement = null;
        videoMaxLimitInputElement = null; minLikesInputElement = null; maxLikesInputElement = null;
        dateStartInputElement = null; dateEndInputElement = null; durationMinInputElement = null; durationMaxInputElement = null;
        orientationNgangCheckboxElement = null; orientationDocCheckboxElement = null; orientationVuongCheckboxElement = null;
        autoRetryCheckboxElement = null; maxRetriesInputElement = null;
        onlyNewCheckboxElement = null; selectAllCheckboxElement = null;
        filenameFormatTitleRadioElement = null; filenameFormatCounterRadioElement = null; filenameFormatDateRadioElement = null;
        checklistAreaElement = null; checklistHeaderElement = null;
        statsDivElement = null; videoPreviewModalElement = null;
        videoPreviewPlayerElement = null; detailPopupElement = null;
        donatePopupElement = null; overlayElement = null;
        concurrentDownloadsInputElement = null; lowRamCheckboxElement = null;

        panelElement = document.createElement('div');
        panelElement.id = PANEL_ID;
        Object.assign(panelElement.style, {
            position: 'fixed', top: '20px', left: '20px', width: '90%', maxWidth: '1200px', minHeight: '550px', maxHeight: '85vh',
            backgroundColor: 'rgba(255, 255, 255, 0.98)', border: '1px solid #dee2e6', borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', zIndex: '99999', display: 'flex', flexDirection: 'column',
            fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', fontSize: '13px', color: '#212529', overflow: 'hidden'
        });

        const header = document.createElement('div');
        header.id = HEADER_ID;
        Object.assign(header.style, {
            padding: '8px 12px', cursor: 'move', backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6',
            borderTopLeftRadius: '8px', borderTopRightRadius: '8px', position: 'relative', userSelect: 'none',
            display: 'flex', alignItems: 'center', color: '#212529'
        });
        const titlePart = document.createElement('div');
        titlePart.textContent = 'Douyin Downloader Panel v7';
        Object.assign(titlePart.style, { fontWeight: 'bold', flexShrink: '0', marginRight: '15px' });
        const centerPart = document.createElement('div');
        Object.assign(centerPart.style, { flexGrow: '1', textAlign: 'center', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', margin: '0 10px', paddingRight: '60px' });
        const authorSpan = document.createElement('span');
        authorSpan.textContent = '(Bởi Nguyễn Xuân Thành) ';
        Object.assign(authorSpan.style, { fontWeight: 'normal', fontSize: '12px' });
        statsDivElement = document.createElement('span');
        statsDivElement.id = STATS_DIV_ID;
        statsDivElement.textContent = 'Lượt thích Min N/A Max N/A';
        statsDivElement.title = 'Lượt thích Min / Max';
        Object.assign(statsDivElement.style, { fontSize: '11px', color: '#6c757d', marginLeft: '5px' });
        centerPart.appendChild(authorSpan);
        centerPart.appendChild(statsDivElement);
        const headerControls = document.createElement('div');
        Object.assign(headerControls.style, { position: 'absolute', top: '50%', right: '8px', transform: 'translateY(-50%)', display: 'flex', gap: '8px', alignItems: 'center' });

        hideButtonElement = document.createElement('button');
        hideButtonElement.id = HIDE_BTN_ID;
        hideButtonElement.innerHTML = '➖';
        hideButtonElement.title = 'Ẩn/Hiện Panel (Shift + D)';
        Object.assign(hideButtonElement.style, { background: 'none', border: 'none', fontSize: '16px', fontWeight: 'bold', color: '#6c757d', cursor: 'pointer', padding: '0 5px', lineHeight: '1' });
        hideButtonElement.onclick = togglePanel;
        headerControls.appendChild(hideButtonElement);

        const exitBtnHeader = document.createElement('button');
        exitBtnHeader.textContent = '✕';
        exitBtnHeader.title = 'Đóng Panel';
        Object.assign(exitBtnHeader.style, { background: 'none', border: 'none', fontSize: '18px', fontWeight: 'bold', color: '#6c757d', cursor: 'pointer', padding: '0 5px', lineHeight: '1' });
        exitBtnHeader.onmouseover = () => { exitBtnHeader.style.color = '#f00'; };
        exitBtnHeader.onmouseout = () => { exitBtnHeader.style.color = '#6c757d'; };
        exitBtnHeader.onclick = handleExit;
        headerControls.appendChild(exitBtnHeader);

        header.appendChild(titlePart);
        header.appendChild(centerPart);
        header.appendChild(headerControls);
        panelElement.appendChild(header);

        const contentArea = document.createElement('div');
        Object.assign(contentArea.style, { display: 'flex', flexDirection: 'row', flexGrow: '1', overflow: 'hidden', padding: '10px' });
        panelElement.appendChild(contentArea);

        const leftPanel = document.createElement('div');
        Object.assign(leftPanel.style, { width: '240px', paddingRight: '10px', borderRight: '1px solid #dee2e6', display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: '0', overflowY: 'auto' });
        contentArea.appendChild(leftPanel);

        const mainControlGroup = document.createElement('div');
        Object.assign(mainControlGroup.style, { display: 'flex', flexDirection: 'column', gap: '8px' });

        checkButtonElement = document.createElement('button');
        checkButtonElement.id = CHECK_BTN_ID;
        checkButtonElement.textContent = '🔍 Kiểm tra Video';
        checkButtonElement.title = 'Quét video của người dùng trên trang đang mở';
        checkButtonElement.onclick = startCheckProcess;
        applyButtonStyle(checkButtonElement, 'primary');
        mainControlGroup.appendChild(checkButtonElement);

        startButtonElement = document.createElement('button');
        startButtonElement.id = START_BTN_ID;
        startButtonElement.textContent = '🚀 Tải Mục Đã Chọn';
        startButtonElement.title = 'Tải xuống các video đã chọn';
        startButtonElement.onclick = startDownloadProcess;
        applyButtonStyle(startButtonElement, 'success');
        startButtonElement.disabled = true;
        mainControlGroup.appendChild(startButtonElement);

        const pauseCancelContainer = document.createElement('div');
        Object.assign(pauseCancelContainer.style, { display: 'flex', gap: '8px' });

        pauseButtonElement = document.createElement('button');
        pauseButtonElement.id = PAUSE_BTN_ID;
        pauseButtonElement.textContent = '⏸️ Tạm dừng';
        pauseButtonElement.title = 'Tạm dừng/tiếp tục tiến trình';
        pauseButtonElement.onclick = handlePauseResume;
        applyButtonStyle(pauseButtonElement, 'warning');
        pauseButtonElement.disabled = true;
        pauseButtonElement.style.flex = '1';
        pauseCancelContainer.appendChild(pauseButtonElement);

        cancelButtonElement = document.createElement('button');
        cancelButtonElement.id = CANCEL_BTN_ID;
        cancelButtonElement.textContent = '🚫 Hủy Bỏ';
        cancelButtonElement.title = 'Dừng hoàn toàn tiến trình hiện tại';
        cancelButtonElement.onclick = handleCancelProcess;
        applyButtonStyle(cancelButtonElement, 'danger-outline');
        cancelButtonElement.disabled = true;
        cancelButtonElement.style.flex = '1';
        pauseCancelContainer.appendChild(cancelButtonElement);
        mainControlGroup.appendChild(pauseCancelContainer);

        const linkButtonsContainer = document.createElement('div');
        Object.assign(linkButtonsContainer.style, { display: 'flex', gap: '8px', marginTop: '5px' });

        youtubeButtonElement = document.createElement('button');
        youtubeButtonElement.id = YOUTUBE_BTN_ID;
        youtubeButtonElement.innerHTML = '📺 YouTube';
        youtubeButtonElement.title = 'Truy cập kênh YouTube Nguyễn Xuân Thành';
        youtubeButtonElement.onclick = () => { window.open(YOUTUBE_CHANNEL_LINK, '_blank', 'noopener,noreferrer'); };
        applyButtonStyle(youtubeButtonElement, 'info');
        youtubeButtonElement.style.flex = '1';
        linkButtonsContainer.appendChild(youtubeButtonElement);
        
        facebookButtonElement = document.createElement('button');
        facebookButtonElement.id = FACEBOOK_BTN_ID;
        facebookButtonElement.innerHTML = '📘 Facebook';
        facebookButtonElement.title = 'Truy cập kênh Facebook Nguyễn Xuân Thành';
        facebookButtonElement.onclick = () => { window.open(FACEBOOK_CHANNEL_LINK, '_blank', 'noopener,noreferrer'); };
        applyButtonStyle(facebookButtonElement, 'info');
        facebookButtonElement.style.flex = '1';
        linkButtonsContainer.appendChild(facebookButtonElement);

        githubButtonElement = document.createElement('button');
        githubButtonElement.id = GITHUB_BTN_ID;
        githubButtonElement.innerHTML = '🐙 GitHub';
        githubButtonElement.title = 'Truy cập GitHub Nguyễn Xuân Thành';
        githubButtonElement.onclick = () => { window.open(GITHUB_CHANNEL_LINK, '_blank', 'noopener,noreferrer'); };
        applyButtonStyle(githubButtonElement, 'secondary');
        githubButtonElement.style.flex = '1';
        linkButtonsContainer.appendChild(githubButtonElement);
        
        mainControlGroup.appendChild(linkButtonsContainer);

        donateButtonElement = document.createElement('button');
        donateButtonElement.id = DONATE_BTN_ID;
        donateButtonElement.innerHTML = '💝 Ủng hộ tác giả';
        donateButtonElement.title = 'Donate ủng hộ tác giả Nguyễn Xuân Thành';
        donateButtonElement.onclick = () => {
            if (overlayElement) overlayElement.style.display = 'block';
            if (donatePopupElement) donatePopupElement.style.display = 'block';
        };
        applyButtonStyle(donateButtonElement, 'success');
        donateButtonElement.style.width = '100%';
        donateButtonElement.style.marginTop = '8px';
        mainControlGroup.appendChild(donateButtonElement);

        exportLinksButtonElement = document.createElement('button');
        exportLinksButtonElement.id = EXPORT_LINKS_BTN_ID;
        exportLinksButtonElement.innerHTML = '📂 Xuất Link (IDM)';
        exportLinksButtonElement.title = 'Xuất danh sách link của các video đã chọn ra file .txt để tải bằng IDM';
        exportLinksButtonElement.onclick = handleExportLinks;
        applyButtonStyle(exportLinksButtonElement, 'primary');
        exportLinksButtonElement.style.width = '100%';
        exportLinksButtonElement.style.marginTop = '8px';
        exportLinksButtonElement.disabled = true;
        mainControlGroup.appendChild(exportLinksButtonElement);

        leftPanel.appendChild(mainControlGroup);

        const optionsGroup = document.createElement('div');
        Object.assign(optionsGroup.style, { border: '1px solid #dee2e6', borderRadius: '5px', padding: '8px', marginTop: '10px' });
        const optionsTitle = document.createElement('div');
        optionsTitle.textContent = 'Tùy chọn tải';
        Object.assign(optionsTitle.style, { fontWeight: 'bold', marginBottom: '5px', fontSize: '10px', color: '#6c757d' });
        optionsGroup.appendChild(optionsTitle);

        const onlyNewContainer = document.createElement('div');
        onlyNewContainer.title = 'Bỏ qua video đã có trong lịch sử tải';
        Object.assign(onlyNewContainer.style, { marginBottom: '8px' });
        onlyNewCheckboxElement = document.createElement('input');
        onlyNewCheckboxElement.type = 'checkbox'; onlyNewCheckboxElement.id = ONLY_NEW_CB_ID; onlyNewCheckboxElement.checked = true;
        Object.assign(onlyNewCheckboxElement.style, { marginRight: '5px', cursor: 'pointer' });
        const onlyNewLabel = document.createElement('label');
        onlyNewLabel.textContent = 'Chỉ tải video mới'; onlyNewLabel.htmlFor = ONLY_NEW_CB_ID; Object.assign(onlyNewLabel.style, { cursor: 'pointer', fontSize: '12px' });
        onlyNewContainer.appendChild(onlyNewCheckboxElement);
        onlyNewContainer.appendChild(onlyNewLabel);
        optionsGroup.appendChild(onlyNewContainer);

        const autoRetryContainer = document.createElement('div');
        autoRetryContainer.title = 'Tự động thử lại nếu tải lỗi (mạng, timeout...)';
        Object.assign(autoRetryContainer.style, { marginBottom: '8px', display: 'flex', alignItems: 'center' });
        autoRetryCheckboxElement = document.createElement('input');
        autoRetryCheckboxElement.type = 'checkbox'; autoRetryCheckboxElement.id = AUTO_RETRY_CB_ID; autoRetryCheckboxElement.checked = true;
        Object.assign(autoRetryCheckboxElement.style, { marginRight: '5px', cursor: 'pointer', flexShrink: '0' });
        const autoRetryLabel = document.createElement('label');
        autoRetryLabel.textContent = 'Tự động thử lại '; autoRetryLabel.htmlFor = AUTO_RETRY_CB_ID; Object.assign(autoRetryLabel.style, { cursor: 'pointer', fontSize: '12px', flexShrink: '0' });
        maxRetriesInputElement = document.createElement('input');
        maxRetriesInputElement.id = MAX_RETRIES_INPUT_ID;
        maxRetriesInputElement.type = 'number'; maxRetriesInputElement.value = '2'; maxRetriesInputElement.min = '0'; maxRetriesInputElement.max = '5';
        Object.assign(maxRetriesInputElement.style, { width: '40px', padding: '2px 4px', border: '1px solid #ced4da', borderRadius: '4px', marginLeft: '3px', marginRight: '3px', backgroundColor: '#fff', color: '#212529', fontSize: '12px', flexShrink: '0' });
        const retriesLabel = document.createElement('span');
        retriesLabel.textContent = ' lần';
        Object.assign(retriesLabel.style, {fontSize: '12px', flexShrink: '0'});
        autoRetryContainer.appendChild(autoRetryCheckboxElement);
        autoRetryContainer.appendChild(autoRetryLabel);
        autoRetryContainer.appendChild(maxRetriesInputElement);
        autoRetryContainer.appendChild(retriesLabel);
        optionsGroup.appendChild(autoRetryContainer);
        
        const concurrentContainer = document.createElement('div');
        Object.assign(concurrentContainer.style, { display: 'flex', alignItems: 'center' });
        const concurrentLabel = document.createElement('label');
        concurrentLabel.textContent = 'Tải đồng thời ';
        concurrentLabel.htmlFor = CONCURRENT_DOWNLOADS_INPUT_ID;
        Object.assign(concurrentLabel.style, { cursor: 'pointer', fontSize: '12px', flexShrink: '0' });
        concurrentDownloadsInputElement = document.createElement('input');
        concurrentDownloadsInputElement.id = CONCURRENT_DOWNLOADS_INPUT_ID;
        concurrentDownloadsInputElement.type = 'number';
        concurrentDownloadsInputElement.value = '3';
        concurrentDownloadsInputElement.min = '1';
        concurrentDownloadsInputElement.max = '10';
        Object.assign(concurrentDownloadsInputElement.style, { width: '40px', padding: '2px 4px', border: '1px solid #ced4da', borderRadius: '4px', marginLeft: '3px', marginRight: '3px', backgroundColor: '#fff', color: '#212529', fontSize: '12px', flexShrink: '0' });
        const concurrentInfo = document.createElement('span');
        concurrentInfo.textContent = '❓';
        concurrentInfo.title = 'Số video tải cùng lúc (1-10).\nChọn số cao có thể gây lag hoặc bị chặn nếu mạng/máy yếu.';
        Object.assign(concurrentInfo.style, { cursor: 'help', marginLeft: '5px', fontSize: '14px', color: '#6c757d' });
        concurrentContainer.appendChild(concurrentLabel);
        concurrentContainer.appendChild(concurrentDownloadsInputElement);
        concurrentContainer.appendChild(concurrentInfo);
        optionsGroup.appendChild(concurrentContainer);

        const lowRamContainer = document.createElement('div');
        lowRamContainer.title = 'Giảm tối đa việc sử dụng RAM. Tải từng file một và dọn dẹp bộ nhớ ngay lập tức.';
        Object.assign(lowRamContainer.style, { marginBottom: '8px', display: 'flex', alignItems: 'center', marginTop: '5px' });
        lowRamCheckboxElement = document.createElement('input');
        lowRamCheckboxElement.type = 'checkbox'; lowRamCheckboxElement.id = LOW_RAM_MODE_CB_ID; lowRamCheckboxElement.checked = true;
        Object.assign(lowRamCheckboxElement.style, { marginRight: '5px', cursor: 'pointer' });
        const lowRamLabel = document.createElement('label');
        lowRamLabel.textContent = 'Chế độ RAM thấp (Khuyên dùng)'; lowRamLabel.htmlFor = LOW_RAM_MODE_CB_ID; 
        Object.assign(lowRamLabel.style, { cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', color: '#198754' });
        
        lowRamCheckboxElement.onchange = () => {
             if (lowRamCheckboxElement.checked) {
                 concurrentDownloadsInputElement.value = '1';
                 concurrentDownloadsInputElement.disabled = true;
             } else {
                 concurrentDownloadsInputElement.disabled = false;
                 concurrentDownloadsInputElement.value = '3';
             }
        };

        lowRamContainer.appendChild(lowRamCheckboxElement);
        lowRamContainer.appendChild(lowRamLabel);
        optionsGroup.appendChild(lowRamContainer);


        leftPanel.appendChild(optionsGroup);

        const filenameOptionsGroup = document.createElement('div');
        Object.assign(filenameOptionsGroup.style, { border: '1px solid #dee2e6', borderRadius: '5px', padding: '8px', marginTop: '5px' });
        const filenameOptionsTitle = document.createElement('div');
        filenameOptionsTitle.textContent = 'Định dạng tên file';
        Object.assign(filenameOptionsTitle.style, { fontWeight: 'bold', marginBottom: '5px', fontSize: '10px', color: '#6c757d' });
        filenameOptionsGroup.appendChild(filenameOptionsTitle);
        
        const createRadioOption = (id, name, label, checked = false) => {
            const container = document.createElement('div');
            Object.assign(container.style, { display: 'flex', alignItems: 'center', marginBottom: '4px' });
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.id = id;
            radio.name = name;
            radio.checked = checked;
            Object.assign(radio.style, { marginRight: '5px', cursor: 'pointer' });
            const labelEl = document.createElement('label');
            labelEl.htmlFor = id;
            labelEl.textContent = label;
            Object.assign(labelEl.style, { cursor: 'pointer', fontSize: '12px' });
            container.appendChild(radio);
            container.appendChild(labelEl);
            return { container, radio };
        };

        const { container: titleContainer, radio: titleRadio } = createRadioOption(FILENAME_FORMAT_TITLE_ID, 'filename-format', 'Lưu theo Tiêu đề video', true);
        filenameFormatTitleRadioElement = titleRadio;
        filenameOptionsGroup.appendChild(titleContainer);

        const { container: counterContainer, radio: counterRadio } = createRadioOption(FILENAME_FORMAT_COUNTER_ID, 'filename-format', 'Lưu theo Số thứ tự (1, 2, 3...)');
        filenameFormatCounterRadioElement = counterRadio;
        filenameOptionsGroup.appendChild(counterContainer);

        const { container: dateContainer, radio: dateRadio } = createRadioOption(FILENAME_FORMAT_DATE_ID, 'filename-format', 'Lưu theo Ngày đăng (YYYY-MM-DD...)');
        filenameFormatDateRadioElement = dateRadio;
        filenameOptionsGroup.appendChild(dateContainer);
        
        leftPanel.appendChild(filenameOptionsGroup);


        const otherControlsGroup = document.createElement('div');
        Object.assign(otherControlsGroup.style, { display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #dee2e6' });

        restartButtonElement = document.createElement('button');
        restartButtonElement.id = RESTART_BTN_ID;
        restartButtonElement.textContent = '🔄 Khởi động lại';
        restartButtonElement.title = 'Khởi động lại script';
        restartButtonElement.onclick = handleRestart;
        applyButtonStyle(restartButtonElement, 'secondary');
        otherControlsGroup.appendChild(restartButtonElement);

        clearHistoryButtonElement = document.createElement('button');
        clearHistoryButtonElement.id = CLEAR_HISTORY_BTN_ID;
        clearHistoryButtonElement.textContent = '🧹 Xóa Lịch sử';
        clearHistoryButtonElement.title = 'Xóa lịch sử tải';
        clearHistoryButtonElement.onclick = handleClearHistory;
        applyButtonStyle(clearHistoryButtonElement, 'danger-outline');
        otherControlsGroup.appendChild(clearHistoryButtonElement);

        downloadErrorsButtonElement = document.createElement('button');
        downloadErrorsButtonElement.id = DOWNLOAD_ERRORS_BTN_ID;
        downloadErrorsButtonElement.textContent = '❗ Tải Log Lỗi';
        downloadErrorsButtonElement.title = 'Chưa có lỗi.';
        downloadErrorsButtonElement.onclick = handleDownloadErrors;
        applyButtonStyle(downloadErrorsButtonElement, 'warning-outline');
        downloadErrorsButtonElement.disabled = true;
        otherControlsGroup.appendChild(downloadErrorsButtonElement);
        leftPanel.appendChild(otherControlsGroup);

        const rightPanel = document.createElement('div');
        Object.assign(rightPanel.style, { flexGrow: '1', display: 'flex', flexDirection: 'column', overflow: 'hidden', marginLeft: '10px' });
        contentArea.appendChild(rightPanel);

        checklistHeaderElement = document.createElement('div');
        checklistHeaderElement.id = CHECKLIST_HEADER_ID;
        Object.assign(checklistHeaderElement.style, { display: 'flex', alignItems: 'center', padding: '5px 8px', borderBottom: '1px solid #dee2e6', backgroundColor: '#f8f9fa', flexShrink: '0', color: '#212529' });
        rightPanel.appendChild(checklistHeaderElement);

        const COL_WIDTHS = {
            check: '60px',
            id: '130px',
            dimensions: '100px',
            orientation: '60px',
            fileSize: '80px',
            likes: '70px',
            date: '110px',
            desc: '220px',
            status: '85px'
        };

        const createCellElement = (tag, width, minWidth, textAlign = 'left', isHeader = false) => {
            const cell = document.createElement(tag);
            Object.assign(cell.style, { flexBasis: width, minWidth: minWidth || width, flexShrink: '0', padding: isHeader ? '0 5px' : '0 5px', textAlign: textAlign, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', justifyContent: textAlign === 'center' ? 'center' : 'flex-start', boxSizing: 'border-box', });
            if (isHeader) { cell.style.fontWeight = 'bold'; cell.style.cursor = 'pointer'; }
            return cell;
        };

        const selectAllContainer = createCellElement('div', COL_WIDTHS.check, COL_WIDTHS.check, 'center', true);
        selectAllContainer.style.cursor = 'default';
        selectAllCheckboxElement = document.createElement('input');
        selectAllCheckboxElement.type = 'checkbox'; selectAllCheckboxElement.id = SELECT_ALL_CB_ID; selectAllCheckboxElement.title = 'Chọn/Bỏ chọn tất cả';
        Object.assign(selectAllCheckboxElement.style, { cursor: 'pointer' });
        selectAllContainer.appendChild(selectAllCheckboxElement);
        checklistHeaderElement.appendChild(selectAllContainer);

        const createSortableHeader = (text, columnId, width, minWidth, textAlign = 'left', tooltipText = '') => {
            const headerCell = document.createElement('span');
            Object.assign(headerCell.style, { flexBasis: width, minWidth: minWidth || width, flexShrink: '0', padding: '0 5px', textAlign: textAlign, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', justifyContent: textAlign === 'center' ? 'center' : 'flex-start', boxSizing: 'border-box', fontWeight: 'bold', cursor: 'pointer' });
            headerCell.innerHTML = text;
            headerCell.dataset.columnId = columnId;
            headerCell.title = tooltipText || `Sắp xếp theo ${text}`;
            headerCell.onclick = handleSortClick;
            const indicator = document.createElement('span');
            indicator.className = SORT_INDICATOR_CLASS;
            Object.assign(indicator.style, { marginLeft: '4px', fontSize: '10px', minWidth: '10px' });
            headerCell.appendChild(indicator);
            return headerCell;
        };

        checklistHeaderElement.appendChild(createSortableHeader('⏳ Thời lượng', 'duration', COL_WIDTHS.id, '80px', 'center', 'Sắp xếp theo Thời lượng Video'));
        checklistHeaderElement.appendChild(createSortableHeader('📐 Khung hình', 'dimensions', COL_WIDTHS.dimensions, '90px', 'center', 'Sắp xếp theo Khung hình (WxH)'));
        checklistHeaderElement.appendChild(createSortableHeader('↔️ Loại', 'orientation', COL_WIDTHS.orientation, '50px', 'center', 'Sắp xếp theo Loại (Ngang/Dọc/Vuông)'));
        checklistHeaderElement.appendChild(createSortableHeader('💾 Dung lượng', 'fileSize', COL_WIDTHS.fileSize, '70px', 'center', 'Sắp xếp theo Dung lượng File (MB/KB)'));
        checklistHeaderElement.appendChild(createSortableHeader('❤️', 'likes', COL_WIDTHS.likes, '50px', 'center', 'Sắp xếp theo Lượt thích'));
        checklistHeaderElement.appendChild(createSortableHeader('📅 Ngày Đăng', 'date', COL_WIDTHS.date, '100px', 'left', 'Sắp xếp theo Ngày đăng'));
        const descHeader = createSortableHeader('📝 Mô tả', 'desc', COL_WIDTHS.desc, '150px', 'left', 'Sắp xếp theo Mô tả');
        checklistHeaderElement.appendChild(descHeader);
        
        const statusHeader = createSortableHeader('📊', 'status', COL_WIDTHS.status, COL_WIDTHS.status, 'left', 'Sắp xếp theo Trạng thái');
        statusHeader.style.paddingLeft = '15px';
        checklistHeaderElement.appendChild(statusHeader);

        const filterInputsRowElement = document.createElement('div');
        Object.assign(filterInputsRowElement.style, {
            display: 'flex', alignItems: 'flex-end', padding: '0px 8px', borderBottom: '1px solid #dee2e6', backgroundColor: '#f8f9fa',
            flexShrink: '0', color: '#212529', minHeight: '50px'
        });
        rightPanel.appendChild(filterInputsRowElement);

        filterInputsRowElement.appendChild(createCellElement('span', COL_WIDTHS.check, COL_WIDTHS.check, 'left'));
        const videoMaxCell = createCellElement('div', COL_WIDTHS.id, COL_WIDTHS.id, 'left');
        Object.assign(videoMaxCell.style, { flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', height: 'auto' });
        const videoMaxLabel = document.createElement('label');
        videoMaxLabel.textContent = 'Video Max:';
        videoMaxLabel.htmlFor = VIDEO_MAX_INPUT_ID;
        Object.assign(videoMaxLabel.style, { fontSize: '11px', color: '#6c757d', marginBottom: '2px' });
        videoMaxLimitInputElement = document.createElement('input');
        videoMaxLimitInputElement.id = VIDEO_MAX_INPUT_ID;
        videoMaxLimitInputElement.type = 'number'; videoMaxLimitInputElement.value = '0'; videoMaxLimitInputElement.min = '0';
        Object.assign(videoMaxLimitInputElement.style, { width: '90%', padding: '4px', border: '1px solid #ced4da', borderRadius: '4px', backgroundColor: '#fff', color: '#212529', fontSize: '12px' });
        videoMaxCell.appendChild(videoMaxLabel);
        videoMaxCell.appendChild(videoMaxLimitInputElement);
        filterInputsRowElement.appendChild(videoMaxCell);
        filterInputsRowElement.appendChild(createCellElement('span', COL_WIDTHS.dimensions, COL_WIDTHS.dimensions, 'left'));
        const orientationFilterCell = createCellElement('div', COL_WIDTHS.orientation, COL_WIDTHS.orientation, 'left');
        Object.assign(orientationFilterCell.style, { flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', height: 'auto', padding: '2px' });
        const createOrientationCheckbox = (label, id) => {
            const container = document.createElement('div');
            Object.assign(container.style, { display: 'flex', alignItems: 'center', fontSize: '11px', color: '#333' });
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = id;
            Object.assign(checkbox.style, { marginRight: '3px' });
            const labelEl = document.createElement('label');
            labelEl.htmlFor = id;
            labelEl.textContent = label;
            container.appendChild(checkbox);
            container.appendChild(labelEl);
            return {container, checkbox};
        };
        const {container: ngangContainer, checkbox: ngangCheckbox} = createOrientationCheckbox('Ngang', ORIENTATION_NGANG_CB_ID);
        orientationNgangCheckboxElement = ngangCheckbox;
        orientationFilterCell.appendChild(ngangContainer);
        const {container: docContainer, checkbox: docCheckbox} = createOrientationCheckbox('Dọc', ORIENTATION_DOC_CB_ID);
        orientationDocCheckboxElement = docCheckbox;
        orientationFilterCell.appendChild(docContainer);
        const {container: vuongContainer, checkbox: vuongCheckbox} = createOrientationCheckbox('Vuông', ORIENTATION_VUONG_CB_ID);
        orientationVuongCheckboxElement = vuongCheckbox;
        orientationFilterCell.appendChild(vuongContainer);
        filterInputsRowElement.appendChild(orientationFilterCell);
        filterInputsRowElement.appendChild(createCellElement('span', COL_WIDTHS.fileSize, COL_WIDTHS.fileSize, 'left'));
        const likesFilterCell = createCellElement('div', COL_WIDTHS.likes, COL_WIDTHS.likes, 'center');
        Object.assign(likesFilterCell.style, { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'auto' });
        minLikesInputElement = document.createElement('input');
        minLikesInputElement.id = MIN_LIKES_INPUT_ID;
        minLikesInputElement.type = 'number'; minLikesInputElement.placeholder = 'Min'; minLikesInputElement.min = '0';
        Object.assign(minLikesInputElement.style, { width: '90%', padding: '2px', border: '1px solid #ced4da', borderRadius: '4px', backgroundColor: '#fff', color: '#212529', fontSize: '11px', marginBottom: '2px' });
        maxLikesInputElement = document.createElement('input');
        maxLikesInputElement.id = MAX_LIKES_INPUT_ID;
        maxLikesInputElement.type = 'number'; maxLikesInputElement.placeholder = 'Max'; maxLikesInputElement.min = '0';
        Object.assign(maxLikesInputElement.style, { width: '90%', padding: '2px', border: '1px solid #ced4da', borderRadius: '4px', backgroundColor: '#fff', color: '#212529', fontSize: '11px' });
        likesFilterCell.appendChild(minLikesInputElement);
        likesFilterCell.appendChild(maxLikesInputElement);
        filterInputsRowElement.appendChild(likesFilterCell);
        const dateFilterCell = createCellElement('div', COL_WIDTHS.date, COL_WIDTHS.date, 'left');
        Object.assign(dateFilterCell.style, { flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', height: 'auto' });
        dateStartInputElement = document.createElement('input');
        dateStartInputElement.id = DATE_START_INPUT_ID;
        dateStartInputElement.type = 'date';
        Object.assign(dateStartInputElement.style, { width: '90%', padding: '2px', border: '1px solid #ced4da', borderRadius: '4px', backgroundColor: '#fff', color: '#212529', fontSize: '11px', marginBottom: '2px' });
        dateEndInputElement = document.createElement('input');
        dateEndInputElement.id = DATE_END_INPUT_ID;
        dateEndInputElement.type = 'date';
        Object.assign(dateEndInputElement.style, { width: '90%', padding: '2px', border: '1px solid #ced4da', borderRadius: '4px', backgroundColor: '#fff', color: '#212529', fontSize: '11px' });
        dateFilterCell.appendChild(dateStartInputElement);
        dateFilterCell.appendChild(dateEndInputElement);
        filterInputsRowElement.appendChild(dateFilterCell);
        const durationFilterCell = createCellElement('div', COL_WIDTHS.desc, COL_WIDTHS.desc, 'left');
        Object.assign(durationFilterCell.style, { flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', height: 'auto' });
        durationMinInputElement = document.createElement('input');
        durationMinInputElement.id = DURATION_MIN_INPUT_ID;
        durationMinInputElement.type = 'number'; durationMinInputElement.placeholder = 'Min giây'; durationMinInputElement.min = '0';
        Object.assign(durationMinInputElement.style, { width: '90%', padding: '2px', border: '1px solid #ced4da', borderRadius: '4px', backgroundColor: '#fff', color: '#212529', fontSize: '11px', marginBottom: '2px' });
        durationMaxInputElement = document.createElement('input');
        durationMaxInputElement.id = DURATION_MAX_INPUT_ID;
        durationMaxInputElement.type = 'number'; durationMaxInputElement.placeholder = 'Max giây'; durationMaxInputElement.min = '0';
        Object.assign(durationMaxInputElement.style, { width: '90%', padding: '2px', border: '1px solid #ced4da', borderRadius: '4px', backgroundColor: '#fff', color: '#212529', fontSize: '11px' });
        durationFilterCell.appendChild(durationMinInputElement);
        durationFilterCell.appendChild(durationMaxInputElement);
        filterInputsRowElement.appendChild(durationFilterCell);

        checklistAreaElement = document.createElement('div');
        checklistAreaElement.id = CHECKLIST_AREA_ID;
        checklistAreaElement.innerHTML = '<span style="padding: 10px; display: block; color: #6c757d;">Chưa có video. Nhấn "Kiểm tra Video".</span>';
        Object.assign(checklistAreaElement.style, { flexGrow: '1', overflowY: 'auto', overflowX: 'hidden', padding: '0px', borderBottom: '1px solid #dee2e6', backgroundColor: '#fff' });
        rightPanel.appendChild(checklistAreaElement);

        const footer = document.createElement('div');
        Object.assign(footer.style, { padding: '8px 12px', borderTop: '1px solid #dee2e6', backgroundColor: '#f8f9fa', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', display: 'flex', flexDirection: 'column', gap: '5px', flexShrink: '0' });
        panelElement.appendChild(footer);

        statusAreaElement = document.createElement('div');
        statusAreaElement.id = STATUS_AREA_ID;
        statusAreaElement.textContent = 'Sẵn sàng.';
        Object.assign(statusAreaElement.style, { fontSize: '12px', color: '#212529', minHeight: '1.2em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' });
        footer.appendChild(statusAreaElement);

        const progressBarContainer = document.createElement('div');
        Object.assign(progressBarContainer.style, { width: '100%', height: '18px', backgroundColor: '#e9ecef', borderRadius: '4px', overflow: 'hidden', position: 'relative', display: 'none' });
        footer.appendChild(progressBarContainer);

        progressBarElement = document.createElement('div');
        progressBarElement.id = PROGRESS_BAR_ID;
        Object.assign(progressBarElement.style, { width: '0%', height: '100%', backgroundColor: '#0d6efd', borderRadius: '4px', transition: 'width 0.2s ease-out' });
        progressBarContainer.appendChild(progressBarElement);

        progressTextElement = document.createElement('div');
        progressTextElement.id = PROGRESS_TEXT_ID;
        Object.assign(progressTextElement.style, { position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', textAlign: 'center', lineHeight: '18px', color: '#fff', fontSize: '11px', fontWeight: 'bold', textShadow: '1px 1px 1px rgba(0, 0, 0, 0.6)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '0 5px' });
        progressBarContainer.appendChild(progressTextElement);

        videoPreviewModalElement = document.createElement('div');
        videoPreviewModalElement.id = VIDEO_PREVIEW_MODAL_ID;
        Object.assign(videoPreviewModalElement.style, { display: 'none', position: 'fixed', zIndex: '100000', left: '0', top: '0', width: '100%', height: '100%', overflow: 'auto', backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', });
        const modalContent = document.createElement('div');
        Object.assign(modalContent.style, { position: 'relative', margin: 'auto', padding: '0', width: 'auto', maxWidth: '80%', maxHeight: '80vh', backgroundColor:'#000' });
        const closeButton = document.createElement('span');
        closeButton.innerHTML = '×';
        Object.assign(closeButton.style, { position: 'absolute', top: '5px', right: '15px', color: '#f1f1f1', fontSize: '35px', fontWeight: 'bold', cursor: 'pointer', zIndex: '1' });
        closeButton.onclick = hideVideoPreview;
        videoPreviewPlayerElement = document.createElement('video');
        videoPreviewPlayerElement.setAttribute('controls', ''); videoPreviewPlayerElement.setAttribute('autoplay', '');
        Object.assign(videoPreviewPlayerElement.style, { width: '100%', maxHeight: '80vh', display: 'block', outline: 'none' });
        modalContent.appendChild(closeButton);
        modalContent.appendChild(videoPreviewPlayerElement);
        videoPreviewModalElement.appendChild(modalContent);
        panelElement.appendChild(videoPreviewModalElement);

        overlayElement = document.createElement('div');
        overlayElement.id = OVERLAY_ID;
        Object.assign(overlayElement.style, { display: 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: '99999' });
        overlayElement.onclick = () => { hideDetailPopup(); hideDonatePopup(); };
        panelElement.appendChild(overlayElement);

        detailPopupElement = document.createElement('div');
        detailPopupElement.id = DETAIL_POPUP_ID;
        Object.assign(detailPopupElement.style, { display: 'none', position: 'absolute', zIndex: '100000', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', padding: '10px', maxWidth: '300px', wordWrap: 'break-word', whiteSpace: 'normal' });
        panelElement.appendChild(detailPopupElement);

        donatePopupElement = document.createElement('div');
        donatePopupElement.id = DONATE_POPUP_ID;
        Object.assign(donatePopupElement.style, { display: 'none', position: 'fixed', zIndex: '100001', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '320px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', padding: '0', overflow: 'hidden', textAlign: 'center', fontFamily: 'Arial, sans-serif' });
        donatePopupElement.innerHTML = `
            <div style="background: linear-gradient(135deg, #11998e, #38ef7d); color: #fff; padding: 15px; font-size: 18px; font-weight: bold; border-bottom: 2px solid #0f8980;">
                💝 Ủng hộ tác giả
            </div>
            <div style="padding: 25px 20px;">
                <p style="margin: 0 0 15px 0; font-size: 14px; color: #555;">Cảm ơn bạn đã sử dụng công cụ!</p>
                <div style="background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                    <div style="font-weight: bold; color: #333; font-size: 16px; margin-bottom: 5px;">Ngân hàng MBBank</div>
                    <div style="color: #666; font-size: 14px; margin-bottom: 8px;">Nguyễn Xuân Thành</div>
                    <div style="font-size: 24px; font-weight: bold; color: #0056b3; letter-spacing: 1px; user-select: all; cursor: text;">01266778899999</div>
                </div>
                <button id="donate-close-btn" style="background-color: #f1f3f5; border: 1px solid #ccc; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold; color: #333; width: 100%; transition: background-color 0.2s;">Đóng</button>
            </div>
        `;
        panelElement.appendChild(donatePopupElement);
        donatePopupElement.querySelector('#donate-close-btn').onclick = () => {
            donatePopupElement.style.display = 'none';
            if (overlayElement) overlayElement.style.display = 'none';
        };
        donatePopupElement.querySelector('#donate-close-btn').onmouseover = function() { this.style.backgroundColor = '#e2e6ea'; };
        donatePopupElement.querySelector('#donate-close-btn').onmouseout = function() { this.style.backgroundColor = '#f1f3f5'; };

        document.body.appendChild(panelElement);

        if (header && panelElement && headerControls) { attachDragListeners(header, panelElement, headerControls); }
        if (checklistAreaElement && selectAllCheckboxElement) { attachChecklistListeners(); }
        document.addEventListener('keydown', handleGlobalKeyDown);
    };
    const applyButtonStyle = (button, type = 'primary') => {
        if (!button || typeof button.style === 'undefined') { return; }
        button.dataset.buttonType = type;
        const baseStyle = { padding: '8px 12px', border: '1px solid transparent', borderRadius: '5px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, opacity 0.2s ease', whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'center', verticalAlign: 'middle', userSelect: 'none' };
        Object.assign(button.style, baseStyle);
        let specificStyles = {};
        switch (type) {
            case 'primary': specificStyles = { backgroundColor: '#0d6efd', borderColor: '#0d6efd', color: '#fff' }; break;
            case 'secondary': specificStyles = { backgroundColor: '#6c757d', borderColor: '#6c757d', color: '#fff' }; break;
            case 'success': specificStyles = { backgroundColor: '#198754', borderColor: '#198754', color: '#fff' }; break;
            case 'danger': specificStyles = { backgroundColor: '#dc3545', borderColor: '#dc3545', color: '#fff' }; break;
            case 'warning': specificStyles = { backgroundColor: '#ffc107', borderColor: '#ffc107', color: '#000' }; break;
            case 'info': specificStyles = { backgroundColor: '#0dcaf0', borderColor: '#0dcaf0', color: '#000' }; break;
            case 'danger-outline': specificStyles = { backgroundColor: 'transparent', borderColor: '#dc3545', color: '#dc3545' }; break;
            case 'warning-outline': specificStyles = { backgroundColor: 'transparent', borderColor: '#ffc107', color: '#ffc107' }; break;
            default: specificStyles = { backgroundColor: '#6c757d', borderColor: '#6c757d', color: '#fff' };
        }
        Object.assign(button.style, specificStyles);
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'disabled') {
                    if (button.disabled) { button.style.opacity = '0.65'; button.style.cursor = 'not-allowed'; }
                    else { button.style.opacity = '1'; button.style.cursor = 'pointer'; }
                }
            });
        });
        observer.observe(button, { attributes: true });
        if (button.disabled) { button.style.opacity = '0.65'; button.style.cursor = 'not-allowed'; }
        if (type.includes('outline')) {
            const originalColor = button.style.color;
            const originalBorderColor = button.style.borderColor;
            const hoverBgColor = originalBorderColor;
            const hoverTextColor = '#fff';
            button.onmouseenter = () => { if (!button.disabled) { button.style.backgroundColor = hoverBgColor; button.style.color = hoverTextColor; } };
            button.onmouseleave = () => { if (!button.disabled) { button.style.backgroundColor = 'transparent'; button.style.color = originalColor; } };
        } else {
            button.onmouseenter = null;
            button.onmouseleave = null;
        }
    };
    const attachDragListeners = (headerElement, panelElement, controlsContainer) => {
        const onMouseDown = (e) => {
            if (e.button !== 0 || (controlsContainer && controlsContainer.contains(e.target))) { return; }
            e.preventDefault();
            isDragging = true;
            dragOffsetX = e.clientX - panelElement.offsetLeft;
            dragOffsetY = e.clientY - panelElement.offsetTop;
            document.body.style.userSelect = 'none';
            document.body.style.cursor = 'move';
            panelElement.style.opacity = '0.85';
            panelElement.style.transition = 'none';
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };
        const onMouseMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            let newLeft = e.clientX - dragOffsetX;
            let newTop = e.clientY - dragOffsetY;
            const panelWidth = panelElement.offsetWidth;
            const panelHeight = panelElement.offsetHeight;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            if (newLeft < -(panelWidth - 40)) newLeft = -(panelWidth - 40);
            if (newTop < 0) newTop = 0;
            if (newLeft > viewportWidth - 40) newLeft = viewportWidth - 40;
            if (newTop > viewportHeight - 40) newTop = viewportHeight - 40;
            panelElement.style.left = `${newLeft}px`;
            panelElement.style.top = `${newTop}px`;
        };
        const onMouseUp = (e) => {
            if (e.button !== 0) return;
            e.preventDefault();
            if (isDragging) {
                isDragging = false;
                document.body.style.userSelect = '';
                document.body.style.cursor = '';
                panelElement.style.opacity = '1';
                panelElement.style.transition = '';
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
        };
        headerElement.addEventListener('mousedown', onMouseDown);
    };
    const attachChecklistListeners = () => {
        if (!checklistAreaElement || !selectAllCheckboxElement) { return; }
        checklistAreaElement.addEventListener('change', (event) => {
            if (event.target.type === 'checkbox' && event.target.classList.contains(VIDEO_CB_CLASS)) {
                updateSelectAllState();
            }
        });
        checklistAreaElement.addEventListener('click', (event) => {
            const retryButton = event.target.closest(`.${RETRY_BTN_CLASS}`);
            if (retryButton) {
                const videoId = retryButton.dataset.videoId;
                handleRetryDownload(videoId);
            }
        });

        selectAllCheckboxElement.addEventListener('change', () => {
            const isChecked = selectAllCheckboxElement.checked;
            const videoCheckboxes = checklistAreaElement.querySelectorAll(`.${VIDEO_CB_CLASS}`);
            videoCheckboxes.forEach(cb => { if (cb.checked !== isChecked) cb.checked = isChecked; });
            updateSelectAllState();
        });
    };
    const updateSelectAllState = () => {
        if (!checklistAreaElement || !selectAllCheckboxElement || !startButtonElement) { return; }
        const videoCheckboxes = checklistAreaElement.querySelectorAll(`.${VIDEO_CB_CLASS}`);
        const totalCheckboxes = videoCheckboxes.length;
        const checkedCount = Array.from(videoCheckboxes).filter(cb => cb.checked).length;
        if (totalCheckboxes === 0) {
            selectAllCheckboxElement.checked = false;
            selectAllCheckboxElement.indeterminate = false;
            selectAllCheckboxElement.disabled = true;
            startButtonElement.disabled = true;
            startButtonElement.textContent = '🚀 Tải Mục Đã Chọn';
            if (exportLinksButtonElement) exportLinksButtonElement.disabled = true;
        } else {
            selectAllCheckboxElement.disabled = isChecking || isRunning;
            if (checkedCount === 0) {
                selectAllCheckboxElement.checked = false;
                selectAllCheckboxElement.indeterminate = false;
                startButtonElement.disabled = true;
                if (exportLinksButtonElement) exportLinksButtonElement.disabled = true;
            } else if (checkedCount === totalCheckboxes) {
                selectAllCheckboxElement.checked = true;
                selectAllCheckboxElement.indeterminate = false;
                startButtonElement.disabled = isChecking || isRunning;
                if (exportLinksButtonElement) exportLinksButtonElement.disabled = isChecking || isRunning;
            } else {
                selectAllCheckboxElement.checked = false;
                selectAllCheckboxElement.indeterminate = true;
                startButtonElement.disabled = isChecking || isRunning;
                if (exportLinksButtonElement) exportLinksButtonElement.disabled = isChecking || isRunning;
            }
            if (!startButtonElement.disabled || (isChecking || isRunning)) {
                startButtonElement.textContent = `🚀 Tải (${checkedCount}) Mục Đã Chọn`;
            }
            if (checkedCount === 0 && !(isChecking || isRunning)) {
                startButtonElement.textContent = '🚀 Tải Mục Đã Chọn';
            }
        }
    };
    const getSelectedVideoIds = () => {
        if (!checklistAreaElement) return [];
        const selectedCheckboxes = checklistAreaElement.querySelectorAll(`input[type="checkbox"].${VIDEO_CB_CLASS}:checked`);
        return Array.from(selectedCheckboxes).map(cb => cb.value);
    };
    const updateChecklistUI = (videoList, currentStats) => {
        if (!checklistAreaElement || !checklistHeaderElement || !statsDivElement) { return; }
        const minLikesStr = currentStats.minLikes === Infinity ? 'N/A' : formatStatNumber(currentStats.minLikes);
        const maxLikesStr = currentStats.maxLikes === -Infinity ? 'N/A' : formatStatNumber(currentStats.maxLikes);
        statsDivElement.textContent = `Lượt thích Min ${minLikesStr} Max ${maxLikesStr}`;
        statsDivElement.title = `Lượt thích thấp nhất: ${currentStats.minLikes === Infinity ? 'N/A' : currentStats.minLikes} / Lượt thích cao nhất: ${currentStats.maxLikes === -Infinity ? 'N/A' : currentStats.maxLikes}`;
        checklistAreaElement.innerHTML = '';
        if (!videoList || videoList.length === 0) {
            checklistAreaElement.innerHTML = '<span style="padding: 10px; display: block; color: #6c757d;">Không có video nào trong danh sách.</span>';
            updateSelectAllState();
            return;
        }
        const fragment = document.createDocumentFragment();
        const COL_WIDTHS = {
            check: '60px',
            id: '130px',
            dimensions: '100px',
            orientation: '60px',
            fileSize: '80px',
            likes: '70px',
            date: '110px',
            desc: '220px',
            status: '85px'
        };

        const createCell = (content, width, minWidth, textAlign = 'left', title = '', isHtml = false) => {
            const cell = document.createElement('span');
            Object.assign(cell.style, { flexBasis: width, minWidth: minWidth || width, flexShrink: '0', padding: '0 5px', textAlign: textAlign, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', justifyContent: textAlign === 'center' ? 'center' : 'flex-start', boxSizing: 'border-box', });
            if (isHtml) { cell.innerHTML = content; } else { cell.textContent = content; }
            cell.title = title || (typeof content === 'string' ? content : '');
            return cell;
        };
        videoList.forEach(video => {
            const row = document.createElement('div');
            row.classList.add('douyin-video-row');
            Object.assign(row.style, { display: 'flex', alignItems: 'center', padding: '0 8px', borderBottom: '1px solid #eee', fontSize: '12px', cursor: 'default', transition: 'background-color 0.2s ease', minHeight: '55px' });

            const checkThumbCell = createCell('', COL_WIDTHS.check, COL_WIDTHS.check, 'left');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox'; checkbox.value = video.id; checkbox.classList.add(VIDEO_CB_CLASS);
            Object.assign(checkbox.style, { marginRight: '8px', cursor: 'pointer' });
            checkbox.title = `Chọn ID: ${video.id}`;
            checkbox.onclick = (e) => e.stopPropagation();
            checkThumbCell.appendChild(checkbox);
            const img = document.createElement('img');
            img.src = video.thumbnailUrl || 'https://placehold.co/40x60/eee/ccc?text=?'; img.alt = 'Ảnh thu nhỏ';
            img.loading = 'lazy'; img.onerror = (e) => { e.target.src = 'https://placehold.co/40x60/eee/ccc?text=Lỗi'; };
            Object.assign(img.style, { width: '35px', height: '50px', objectFit: 'cover', borderRadius: '3px', border: '1px solid #eee', cursor: 'pointer' });
            img.onclick = (e) => { e.stopPropagation(); showVideoPreview(video.id); };
            checkThumbCell.appendChild(img);
            row.appendChild(checkThumbCell);
            
            const durationText = formatDuration(video.duration);
            const fullDurationTooltip = `Thời lượng: ${Math.round(video.duration)} giây`;
            const durationCell = createCell(durationText, COL_WIDTHS.id, '80px', 'center', fullDurationTooltip);
            row.appendChild(durationCell);

            const dimensionsText = (video.width && video.height) ? `${video.width}x${video.height}` : 'N/A';
            row.appendChild(createCell(dimensionsText, COL_WIDTHS.dimensions, '90px', 'center', dimensionsText));
            row.appendChild(createCell(video.orientation || 'N/A', COL_WIDTHS.orientation, '50px', 'center', video.orientation));
            
            const fileSizeCell = createCell(video.size ? formatBytes(video.size) : 'N/A', COL_WIDTHS.fileSize, '70px', 'right', video.size ? formatBytes(video.size) : 'N/A');
            fileSizeCell.dataset.cell = 'fileSize';
            fileSizeCell.dataset.videoId = video.id;
            row.appendChild(fileSizeCell);
            
            row.appendChild(createCell(formatStatNumber(video.likes), COL_WIDTHS.likes, '50px', 'center', `${video.likes} lượt thích`));
            row.appendChild(createCell(formatTimestamp(video.createTime), COL_WIDTHS.date, '100px', 'left', `Đăng lúc: ${new Date(video.createTime * 1000).toLocaleString()}`));
            
            const fullDesc = video.desc || '(Không có mô tả)';
            const truncatedDesc = fullDesc.length > DESC_TRUNCATE_LENGTH ? fullDesc.substring(0, DESC_TRUNCATE_LENGTH) + '...' : fullDesc;
            const descCell = createCell(truncatedDesc, COL_WIDTHS.desc, '150px', 'left', fullDesc);
            descCell.classList.add(DESC_CELL_CLASS); descCell.dataset.fullContent = fullDesc; Object.assign(descCell.style, { cursor: 'pointer' }); descCell.onclick = (e) => showDetailPopup(e, 'desc');
            row.appendChild(descCell);

            const statusCell = createCell('', COL_WIDTHS.status, COL_WIDTHS.status, 'left', '', true);
            statusCell.classList.add(PROGRESS_STATUS_CLASS);
            statusCell.dataset.videoId = video.id;
            statusCell.style.fontWeight = 'bold';
            
            row.appendChild(statusCell);
            fragment.appendChild(row);
            
            updateVideoStatusUI(video);
        });
        checklistAreaElement.appendChild(fragment);
        updateSelectAllState();
        updateSortIndicators();
    };
    
    const updateVideoStatusUI = (video, progressText = '') => {
        if (!checklistAreaElement) return;
        const statusCell = checklistAreaElement.querySelector(`.${PROGRESS_STATUS_CLASS}[data-video-id="${video.id}"]`);
        if (!statusCell) return;

        const row = statusCell.closest('.douyin-video-row');

        let statusContent = '';
        let statusTitle = '';
        let rowColor = row ? row.style.backgroundColor : '';
        let cellColor = '#6c757d';

        statusCell.style.justifyContent = 'flex-start';
        statusCell.style.paddingLeft = '15px';

        switch(video.status) {
            case 'downloaded':
                statusContent = '✅';
                statusTitle = `Đã tải thành công (${formatBytes(video.size)})`;
                rowColor = 'rgba(220, 255, 220, 0.7)';
                cellColor = '#198754';
                break;
            case 'error':
                statusTitle = 'Tải lỗi. Nhấn để thử lại.';
                statusContent = `<span style="display: flex; align-items: center; gap: 5px;">❌<span class="${RETRY_BTN_CLASS}" data-video-id="${video.id}" title="${statusTitle}" style="cursor: pointer; font-size: 16px;">🔄</span></span>`;
                rowColor = 'rgba(255, 220, 220, 0.8)';
                cellColor = '#dc3545';
                break;
            case 'queued':
                statusContent = '⏳';
                statusTitle = 'Đang trong hàng đợi tải';
                rowColor = 'rgba(224, 247, 250, 0.8)';
                cellColor = '#0dcaf0';
                break;
            case 'downloading':
                 statusContent = progressText || '0%';
                 statusTitle = 'Đang tải...';
                 rowColor = 'rgba(255, 248, 220, 0.8)';
                 cellColor = '#0d6efd';
                 break;
            default:
                 statusContent = (video.status === 'unavailable') ? 'Ẩn/Xóa' : 'Sẵn sàng';
                 statusTitle = (video.status === 'unavailable') ? 'Video này có thể đã bị xóa hoặc ẩn' : 'Sẵn sàng để tải';
                 rowColor = (video.status === 'unavailable') ? 'rgba(230, 230, 230, 0.7)' : '#fff';
                 cellColor = '#6c757d';
                break;
        }
        
        statusCell.innerHTML = statusContent;
        statusCell.title = statusTitle;
        statusCell.style.color = cellColor;
        if (row) {
            row.style.backgroundColor = rowColor;
        }
    };

    const handleSortClick = (event) => {
        const targetHeader = event.currentTarget;
        const columnId = targetHeader.dataset.columnId;
        if (!columnId) return;
        if (currentSortColumn === columnId) { currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc'; }
        else { currentSortColumn = columnId; currentSortDirection = (columnId === 'desc' || columnId === 'status' || columnId === 'dimensions' || columnId === 'orientation' || columnId === 'fileSize') ? 'asc' : 'desc'; }
        sortCheckedList();
    };
    const sortCheckedList = () => {
        if (!Array.isArray(checkedVideoList) || checkedVideoList.length === 0) return;
        checkedVideoList.sort((a, b) => {
            let valA, valB;
            switch (currentSortColumn) {
                case 'duration': valA = a.duration ?? 0; valB = b.duration ?? 0; return valA - valB;
                case 'likes': valA = a.likes ?? -1; valB = b.likes ?? -1; return valA - valB;
                case 'date': case 'createTime': valA = a.createTime ?? 0; valB = b.createTime ?? 0; return valA - valB;
                case 'desc': valA = (a.desc || '').toLowerCase(); valB = (b.desc || '').toLowerCase(); return valA.localeCompare(valB);
                case 'status': valA = a.status || 'ok'; valB = b.status || 'ok'; return valA.localeCompare(valB);
                case 'dimensions': valA = (a.width || 0) * (a.height || 0); valB = (b.width || 0) * (b.height || 0); return valA - valB;
                case 'orientation': valA = a.orientation || ''; valB = b.orientation || ''; return valA.localeCompare(valB);
                case 'fileSize': valA = a.size ?? -1; valB = b.size ?? -1; return valA - valB;
                default: return 0;
            }
        });
        if (currentSortDirection === 'desc') { checkedVideoList.reverse(); }
        updateChecklistUI(checkedVideoList, status);
    };
    const updateSortIndicators = () => {
        if (!checklistHeaderElement) return;
        checklistHeaderElement.querySelectorAll(`.${SORT_INDICATOR_CLASS}`).forEach(ind => ind.textContent = '');
        const activeHeader = checklistHeaderElement.querySelector(`span[data-column-id="${currentSortColumn}"]`);
        if (activeHeader) { const ind = activeHeader.querySelector(`.${SORT_INDICATOR_CLASS}`); if (ind) ind.textContent = currentSortDirection === 'asc' ? ' ▲' : ' ▼'; }
    };
    const startCheckProcess = async () => {
        if (isChecking || isRunning) { updateStatus("Đang có tiến trình khác chạy.", true); return; }

        resetState();
        isExiting = false;
        resetUIState(true, false);
        startTime = Date.now();
        const currentUserId = getSecUserIdFromUrl();
        if (!currentUserId) {
            logError("Không thể lấy sec_user_id từ URL.", null, 'Lỗi cấu hình');
            updateStatus("Lỗi: Không tìm thấy ID người dùng trên trang. Vui lòng đảm bảo bạn đang ở trang hồ sơ người dùng Douyin.", true);
            resetUIState(false, false);
            return;
        }
        
        const minLikesFilter = parseInt(minLikesInputElement.value, 10) || 0;
        const maxLikesFilter = parseInt(maxLikesInputElement.value, 10) || Infinity;

        const minDateFilter = dateStartInputElement.value ? new Date(dateStartInputElement.value).setHours(0, 0, 0, 0) / 1000 : 0;
        const maxDateFilter = dateEndInputElement.value ? new Date(dateEndInputElement.value).setHours(23, 59, 59, 999) / 1000 : Infinity;
        const minDurationFilter = parseInt(durationMinInputElement.value, 10) || 0;
        const maxDurationFilter = parseInt(durationMaxInputElement.value, 10) || Infinity;

        const selectedOrientations = [];
        if (orientationNgangCheckboxElement.checked) selectedOrientations.push('Ngang');
        if (orientationDocCheckboxElement.checked) selectedOrientations.push('Dọc');
        if (orientationVuongCheckboxElement.checked) selectedOrientations.push('Vuông');
        const applyOrientationFilter = selectedOrientations.length > 0;

        status.checkedSkippedFilter = 0; let max_cursor = 0; let hasMore = 1; let limitReached = false; let apiErrorCount = 0; const MAX_API_ERRORS = 3; const videoCountLimit = parseInt(videoMaxLimitInputElement.value, 10) || 0;
        let userVideoCount = 0; status.minLikes = Infinity; status.maxLikes = -Infinity;
        try {
            while (hasMore === 1 && !isExiting && !limitReached && !isPaused) {
                while (isPaused && !isExiting) { updateStatus(`Tạm dừng kiểm tra...`, false, true); await waitforme(500); }
                if (isExiting) break;
                resetUIState(true, false);
                const batchData = await fetchVideoBatch(currentUserId, max_cursor);
                if (isExiting) break;
                if (!batchData) { apiErrorCount++; if (apiErrorCount >= MAX_API_ERRORS) { updateStatus(`Lỗi API ${apiErrorCount} lần. Dừng kiểm tra.`, true); hasMore = 0; break; } else { updateStatus(`Lỗi API (${apiErrorCount}/${MAX_API_ERRORS}). Đang thử lại...`, true); await waitforme(3000 + Math.random() * 2000); continue; } }
                apiErrorCount = 0; hasMore = batchData.has_more; max_cursor = batchData.max_cursor; const awemeList = batchData.aweme_list || [];
                
                if (awemeList.length === 0 && hasMore === 1) {
                    console.log("DEBUG: API trả về 0 video nhưng vẫn báo hasMore. Có thể đã hết video hoặc lỗi tạm thời.");
                }

                for (const video of awemeList) {
                    if (isExiting || limitReached || isPaused) break;
                    while (isPaused && !isExiting) { updateStatus(`Tạm dừng kiểm tra...`, false, true); await waitforme(500); }
                    if (isExiting) break;
                    resetUIState(true, false);
                    status.checkedAPI++;
                    try {
                        const aweme_id = video?.aweme_id;
                        if (!aweme_id || checkedVideoList.some(v => v.id === aweme_id)) continue;

                        const statistics = video?.statistics;
                        const create_time = video?.create_time;
                        const desc = video?.desc ?? '';
                        const share_url = video?.share_info?.share_url ?? '#';
                        const videoData = video?.video;
                        const thumbnailUrl = videoData?.origin_cover?.url_list?.[0] ?? videoData?.cover?.url_list?.[0] ?? null;
                        let downloadUrl = videoData?.play_addr?.url_list?.[0] ?? null;
                        if (downloadUrl?.startsWith('http:')) { downloadUrl = 'https:' + downloadUrl.substring(5); }
                        const width = videoData?.width ?? null;
                        const height = videoData?.height ?? null;
                        const durationInSeconds = (videoData?.duration ?? 0) / 1000;
                        let orientation = 'N/A';
                        if (width && height) { if (width > height) orientation = 'Ngang'; else if (height > width) orientation = 'Dọc'; else orientation = 'Vuông'; }
                        let videoApiStatus = 'ok';
                        if (video?.status?.is_delete || video?.is_delete) videoApiStatus = 'unavailable';
                        if (!create_time || !downloadUrl || !thumbnailUrl) continue;

                        const likes = statistics?.digg_count ?? 0;
                        if ((minLikesFilter > 0 && likes < minLikesFilter) || (maxLikesFilter !== Infinity && likes > maxLikesFilter)) {
                            status.checkedSkippedFilter++; continue;
                        }
                        if (create_time < minDateFilter || create_time > maxDateFilter) {
                            status.checkedSkippedFilter++; continue;
                        }
                        if (durationInSeconds < minDurationFilter || (maxDurationFilter !== Infinity && durationInSeconds > maxDurationFilter)) {
                             status.checkedSkippedFilter++; continue;
                        }
                        if (applyOrientationFilter && !selectedOrientations.includes(orientation)) {
                            status.checkedSkippedFilter++; continue;
                        }

                        if (likes !== null && !isNaN(likes)) { status.minLikes = Math.min(status.minLikes, likes); status.maxLikes = Math.max(status.maxLikes, likes); }
                        let finalStatus = videoApiStatus;
                        if (downloadedHistory.has(aweme_id)) { finalStatus = 'downloaded'; }
                        checkedVideoList.push({ id: aweme_id, likes: likes, createTime: create_time, desc: desc, shareUrl: share_url, thumbnailUrl: thumbnailUrl, downloadUrl: downloadUrl, status: finalStatus, size: null, width: width, height: height, orientation: orientation, duration: durationInSeconds });
                        status.checkedValid++; userVideoCount++;
                        if (status.checkedValid % 10 === 0 || hasMore === 0 || limitReached) {
                            updateChecklistUI(checkedVideoList, status);
                            updateStatus(`Đã kiểm tra: ${status.checkedValid} (Bỏ qua: ${status.checkedSkippedFilter}) / API: ${status.checkedAPI}...`);
                        }
                    } catch (extractError) {
                        logError(`Lỗi xử lý video chỉ mục ${status.checkedAPI - 1}`, extractError, 'Lỗi trích xuất dữ liệu');
                        continue;
                    }
                    if (videoCountLimit > 0 && userVideoCount >= videoCountLimit) {
                        limitReached = true;
                        updateStatus(`Đạt giới hạn ${videoCountLimit} video.`);
                        break;
                    }
                }
                if (isExiting || limitReached) break;
                if (hasMore === 1) { await waitforme(200 + Math.random() * 300); }
            }
        } catch (error) {
            logError("Lỗi nghiêm trọng khi kiểm tra", error, 'Lỗi nghiêm trọng');
            updateStatus("Gặp lỗi không mong muốn. Kiểm tra Console.", true);
        } finally {
            const durationProcess = ((Date.now() - startTime) / 1000).toFixed(1);
            if (!isExiting) {
                updateChecklistUI(checkedVideoList, status);
                sortCheckedList();
                const finalMsg = `Hoàn tất kiểm tra ${status.checkedValid} video (Bỏ qua: ${status.checkedSkippedFilter}, API: ${status.checkedAPI}) trong ${durationProcess} giây. ${limitReached ? '(Đạt giới hạn)' : ''}`;
                updateStatus(finalMsg, errorLog.length > 0);
                
                resetUIState(false, false);
            } else {
                updateStatus(`Kiểm tra bị hủy sau ${durationProcess} giây.`);
                resetUIState(false, false);
            }
            isExiting = false;
        }
    };
    
    const startDownloadProcess = async () => {
        if (isChecking || isRunning) { updateStatus("Đang có tiến trình khác chạy.", true); return; }

        const selectedIds = getSelectedVideoIds();
        if (selectedIds.length === 0) {
            updateStatus("Vui lòng chọn video.", true);
            if(startButtonElement) { startButtonElement.style.animation = 'shake 0.5s'; setTimeout(() => { startButtonElement.style.animation = ''; }, 500); }
            return;
        }

        let videosToProcess = checkedVideoList.filter(video => selectedIds.includes(video.id));
        
        let shouldSkipHistory = onlyNewCheckboxElement.checked;
        if (!shouldSkipHistory) {
            const hasDownloadedItems = videosToProcess.some(v => downloadedHistory.has(v.id));
            if (hasDownloadedItems) {
                if (!confirm("Bạn có muốn tải lại các video đã tồn tại trong lịch sử không?")) {
                    onlyNewCheckboxElement.checked = true;
                    shouldSkipHistory = true;
                }
            }
        }
        
        let skippedCount = 0;
        if (shouldSkipHistory) {
            const originalCount = videosToProcess.length;
            videosToProcess = videosToProcess.filter(video => !downloadedHistory.has(video.id));
            skippedCount = originalCount - videosToProcess.length;
        }

        if (videosToProcess.length === 0) {
            updateStatus(`Không có video mới nào để tải. ${skippedCount > 0 ? `(Đã bỏ qua ${skippedCount} video cũ)` : ''}`, false);
            return;
        }
        
        const useCounter = filenameFormatCounterRadioElement.checked;
        const useDate = filenameFormatDateRadioElement.checked;
        let downloadCounter = 1;

        videosToProcess.forEach(video => {
            let finalFilename = '';
            if (useCounter) {
                finalFilename = `${downloadCounter}.mp4`;
                downloadCounter++;
            } else if (useDate) {
                finalFilename = `${formatTimestampForFilename(video.createTime)}_${video.id}.mp4`;
            } else { 
                const cleanDesc = sanitizeFilename(video.desc);
                const baseFilename = `${cleanDesc}_${video.id}`;
                finalFilename = (baseFilename.length > 200 ? baseFilename.substring(0, 200) : baseFilename) + '.mp4';
            }
            video.finalFilename = finalFilename;
        });

        downloadQueue = [...videosToProcess];
        status.totalToDownload = downloadQueue.length;
        status.downloadedSuccess = 0;
        status.downloadedFailed = 0;
        status.downloadedSkipped = skippedCount;
        status.downloadedRetries = 0;
        
        isExiting = false;
        isPaused = false;
        resetUIState(false, true);
        startTime = Date.now();
        updateStatus(`Chuẩn bị tải ${status.totalToDownload} video... ${skippedCount > 0 ? `(Bỏ qua ${skippedCount} video cũ)` : ''}`);
        updateOverallProgress();

        downloadQueue.forEach(video => {
            if (video.status !== 'downloading') {
                video.status = 'queued';
                updateVideoStatusUI(video);
            }
        });

        let concurrency = parseInt(concurrentDownloadsInputElement.value, 10) || 3;
        if (lowRamCheckboxElement && lowRamCheckboxElement.checked) { concurrency = 1; }
        const workers = Array(concurrency).fill(null).map(() => downloadWorker());
        await Promise.all(workers);

        const duration = ((Date.now() - startTime) / 1000).toFixed(1);
        saveHistory();
        if (!isExiting) {
            const retryText = status.downloadedRetries > 0 ? ` (${status.downloadedRetries} lượt thử lại)` : '';
            const finalMsg = `Hoàn tất tải sau ${duration} giây. Thành công: ${status.downloadedSuccess}, Lỗi: ${status.downloadedFailed}, Bỏ qua: ${status.downloadedSkipped}${retryText}.`;
            updateStatus(finalMsg, status.downloadedFailed > 0 || errorLog.length > 0);
        } else {
            updateStatus(`Tải bị hủy sau ${duration} giây.`);
        }
        resetUIState(false, false);
    };

    const downloadWorker = async () => {
        while (downloadQueue.length > 0) {
            if (isExiting) break;
            while (isPaused && !isExiting) { await waitforme(500); }
            if (isExiting) break;

            const videoInfo = downloadQueue.shift();
            if (!videoInfo) continue;
            
            videoInfo.status = 'downloading';
            updateVideoStatusUI(videoInfo, '0%');
            
            const filename = videoInfo.finalFilename || `${videoInfo.id}.mp4`;

            let success = false;
            let attempt = 0;
            const maxRetries = autoRetryCheckboxElement.checked ? (parseInt(maxRetriesInputElement.value, 10) || DEFAULT_MAX_RETRIES) : 0;
            const maxAttempts = maxRetries + 1;

            while (attempt < maxAttempts && !success && !isExiting) {
                attempt++;
                if (attempt > 1) {
                    status.downloadedRetries++;
                    updateStatus(`[Thử lại ${attempt-1}/${maxRetries}] Video ID: ${videoInfo.id}`);
                    await waitforme(2000 + Math.random() * 1000);
                }
                
                let videoBlob = await downloadVideoBlob(videoInfo.downloadUrl, videoInfo.id, (progress) => {
                    if (isExiting) return;
                    if (progress >= 0 && progress <= 100) {
                        updateVideoStatusUI(videoInfo, `${progress}%`);
                    }
                });

                if (isExiting) break;

                if (videoBlob) {
                    triggerDownload(videoBlob, filename);
                    status.downloadedSuccess++;
                    downloadedHistory.add(videoInfo.id);
                    videoInfo.status = 'downloaded';
                    videoInfo.size = videoBlob.size;
                    success = true;
                    videoBlob = null; // Force clear
                }
                
                if (lowRamCheckboxElement && lowRamCheckboxElement.checked) {
                    await waitforme(200); // Small delay for GC
                }
            }

            if (!isExiting) {
                if (!success) {
                    status.downloadedFailed++;
                    videoInfo.status = 'error';
                }
                updateOverallProgress();
                updateVideoStatusUI(videoInfo);
                const fileSizeCell = checklistAreaElement.querySelector(`[data-cell="fileSize"][data-video-id="${videoInfo.id}"]`);
                if(fileSizeCell && videoInfo.size) {
                    fileSizeCell.textContent = formatBytes(videoInfo.size);
                }
            }
        }
    };
    
    const handleRetryDownload = (videoId) => {
        if (!isRunning || isExiting) {
             updateStatus("Chỉ có thể thử lại khi tiến trình tải đang chạy.", true);
             return;
        }
        
        const videoInfo = checkedVideoList.find(v => v.id === videoId);
        if (videoInfo && videoInfo.status === 'error') {
            status.downloadedFailed--;
            updateOverallProgress();
            
            videoInfo.status = 'queued';
            updateVideoStatusUI(videoInfo);
            downloadQueue.unshift(videoInfo);
            updateStatus(`Đã thêm video ${videoId} vào hàng đợi thử lại.`);
        }
    };
    
    const handlePauseResume = () => { isPaused = !isPaused; resetUIState(isChecking, isRunning); updateStatus(isPaused ? "Đã tạm dừng." : "Đang tiếp tục...", false, isPaused); };
    const handleCancelProcess = () => { if (isChecking || isRunning) { updateStatus("Đang hủy bỏ...", false, true); isExiting = true; isPaused = false; if(cancelButtonElement) cancelButtonElement.disabled = true; if(pauseButtonElement) pauseButtonElement.disabled = true; } };
    const handleRestart = () => {
        if (isChecking || isRunning) { if (!confirm("Đang chạy. Khởi động lại?")) return; }
        updateStatus("Đang khởi động lại...");
        isExiting = true;
        if (document.getElementById(PANEL_ID)) {
            try { document.getElementById(PANEL_ID).remove(); } catch (e) { console.warn("Lỗi khi gỡ panel DOM trong restart:", e); }
        }
        document.removeEventListener('keydown', handleGlobalKeyDown);
        setTimeout(() => { isExiting = false; initializeDownloader(); }, 300);
    };
    const handleExit = () => {
        if (isChecking || isRunning) { if (!confirm("Đang chạy. Đóng panel?")) return; }
        updateStatus("Đang đóng panel...");
        isExiting = true;
        document.removeEventListener('keydown', handleGlobalKeyDown);
        if (document.getElementById(PANEL_ID)) {
            try { document.getElementById(PANEL_ID).remove(); } catch (e) { console.warn("Lỗi khi gỡ panel DOM trong exit:", e); }
        }
    };
    const handleClearHistory = () => {
        if (isChecking || isRunning) { updateStatus("Không thể xóa lịch sử khi đang chạy.", true); return; }
        if (confirm("Xóa lịch sử tải?")) {
            downloadedHistory.clear();
            try {
                localStorage.removeItem(LOCALSTORAGE_KEY_HISTORY);
                updateStatus("Đã xóa lịch sử tải.");
                if (checkedVideoList.length > 0 && checklistAreaElement) {
                    checkedVideoList.forEach(v => { if(v.status === 'downloaded') v.status = 'ok'; });
                    updateChecklistUI(checkedVideoList, status);
                }
            } catch (error) { logError("Lỗi xóa lịch sử LocalStorage", error, 'Lỗi LocalStorage'); updateStatus("Lỗi xóa lịch sử.", true); }
        }
    };
    const handleDownloadErrors = () => {
        if (errorLog.length === 0) { updateStatus("Không có lỗi.", true); return; }
        try {
            let errorContent = `Nhật ký lỗi Douyin DL\nThời gian: ${new Date().toISOString()}\nUser Agent: ${navigator.userAgent}\nĐịa chỉ: ${window.location.href}\n\nTổng số lỗi: ${errorLog.length}\n====================================\n\n`;
            errorLog.forEach((err, index) => { errorContent += `[Lỗi ${index + 1}] - ${err.timestamp}\nLoại: ${err.type || 'Lỗi chung'}\nThông báo: ${err.message}\n${err.details ? `Chi tiết:\n${err.details}\n` : ''}------------------------------------\n`; });
            const blob = new Blob([errorContent], { type: 'text/plain;charset=utf-8' });
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            triggerDownload(blob, `douyin-downloader-error-log-${timestamp}.txt`);
            updateStatus(`Đã tạo tệp nhật ký lỗi (${errorLog.length}).`);
        } catch (error) { logError("Lỗi tạo tệp nhật ký", error, 'Lỗi tạo tệp'); updateStatus("Lỗi tạo tệp nhật ký.", true); }
    };

    const handleExportLinks = () => {
        const selectedIds = getSelectedVideoIds();
        if (selectedIds.length === 0) {
            updateStatus("Vui lòng chọn video để xuất link.", true);
            return;
        }

        try {
            const selectedVideos = checkedVideoList.filter(v => selectedIds.includes(v.id));
            const linksContent = selectedVideos.map(v => v.downloadUrl).join('\n');
            const blob = new Blob([linksContent], { type: 'text/plain;charset=utf-8' });
            
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
            const userName = getSecUserIdFromUrl() || 'douyin';
            const filename = `douyin-links-${userName}-${timestamp}.txt`;
            
            triggerDownload(blob, filename);
            updateStatus(`Đã xuất ${selectedVideos.length} link ra file TXT.`);
        } catch (error) {
            logError("Lỗi xuất link video", error, 'ExportError');
            updateStatus("Lỗi khi xuất danh sách link.", true);
        }
    };

    const togglePanel = () => {
        if (panelElement) {
            const isHidden = panelElement.style.display === 'none';
            panelElement.style.display = isHidden ? 'flex' : 'none';
            if (hideButtonElement) { hideButtonElement.innerHTML = isHidden ? '➖' : '➕'; hideButtonElement.title = isHidden ? 'Ẩn (Shift+D)' : 'Hiện (Shift+D)'; }
        }
    };
    const handleGlobalKeyDown = (e) => { if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return; if (e.shiftKey && e.key.toLowerCase() === 'd') { e.preventDefault(); togglePanel(); } };
    const showVideoPreview = (videoId) => {
        if (!videoPreviewModalElement || !videoPreviewPlayerElement) { return; }
        const video = checkedVideoList.find(v => v.id === videoId);
        if (!video || !video.downloadUrl) { updateStatus("Không tìm thấy URL video để xem trước.", true); return; }
        videoPreviewPlayerElement.src = video.downloadUrl;
        videoPreviewModalElement.style.display = 'flex';
        videoPreviewPlayerElement.load();
        videoPreviewPlayerElement.play().catch(e => {});
    };
    const hideVideoPreview = () => {
        if (videoPreviewModalElement && videoPreviewPlayerElement) {
            videoPreviewModalElement.style.display = 'none';
            videoPreviewPlayerElement.pause();
            videoPreviewPlayerElement.removeAttribute('src');
            videoPreviewPlayerElement.load();
        }
    };
    const showDetailPopup = (event, type) => {
        const cell = event.currentTarget;
        const fullText = cell.dataset.fullContent;
        if (!fullText || !detailPopupElement || !overlayElement) return;
        detailPopupElement.textContent = fullText;
        const cellRect = cell.getBoundingClientRect();
        const panelRect = panelElement.getBoundingClientRect();
        let top = cellRect.bottom + window.scrollY;
        let left = cellRect.left + window.scrollX;
        detailPopupElement.style.display = 'block';
        const popupWidth = detailPopupElement.offsetWidth;
        const popupHeight = detailPopupElement.offsetHeight;
        if (left + popupWidth > window.innerWidth - 10) { left = window.innerWidth - popupWidth - 10; }
        if (top + popupHeight > window.innerHeight - 10) { top = cellRect.top + window.scrollY - popupHeight - 5; }
        if (left < 10) left = 10;
        if (top < 10) top = 10;
        detailPopupElement.style.top = `${top - panelRect.top}px`;
        detailPopupElement.style.left = `${left - panelRect.left}px`;
        overlayElement.style.display = 'block';
    };
    const hideDetailPopup = () => { if (detailPopupElement) detailPopupElement.style.display = 'none'; if (overlayElement && donatePopupElement && donatePopupElement.style.display !== 'block') overlayElement.style.display = 'none'; };
    const hideDonatePopup = () => { if (donatePopupElement) donatePopupElement.style.display = 'none'; if (overlayElement && detailPopupElement && detailPopupElement.style.display !== 'block') overlayElement.style.display = 'none'; };
    const saveHistory = () => {
        if (downloadedHistory.size === 0) { try { localStorage.removeItem(LOCALSTORAGE_KEY_HISTORY); } catch (e) {} return; }
        try {
            const historyArray = Array.from(downloadedHistory);
            localStorage.setItem(LOCALSTORAGE_KEY_HISTORY, JSON.stringify(historyArray));
        } catch (error) {
            if (error.name === 'QuotaExceededError') { logError("Lỗi lưu lịch sử: Bộ nhớ đầy.", error, 'Lỗi LocalStorage'); updateStatus("Lỗi: Bộ nhớ LocalStorage đầy.", true); }
            else { logError("Lỗi lưu LocalStorage", error, 'Lỗi LocalStorage'); updateStatus("Lỗi lưu lịch sử.", true); }
        }
    };
    const loadHistory = () => {
        try {
            const storedHistory = localStorage.getItem(LOCALSTORAGE_KEY_HISTORY);
            if (storedHistory) {
                const historyArray = JSON.parse(storedHistory);
                if (Array.isArray(historyArray)) { downloadedHistory = new Set(historyArray); }
                else { localStorage.removeItem(LOCALSTORAGE_KEY_HISTORY); downloadedHistory = new Set(); }
            } else { downloadedHistory = new Set(); }
        } catch (error) { logError("Lỗi tải lịch sử LocalStorage", error, 'Lỗi LocalStorage'); updateStatus("Lỗi tải lịch sử.", true); downloadedHistory = new Set(); try { localStorage.removeItem(LOCALSTORAGE_KEY_HISTORY); } catch (e) {} }
    };
    const getSecUserIdFromUrl = () => {
        try {
            const match = window.location.pathname.match(/\/user\/([a-zA-Z0-9_.-]+)/);
            if (match && match[1]) {
                return match[1].split('?')[0];
            }
            return null;
        } catch (e) {
            console.error("Lỗi khi lấy sec_user_id từ URL:", e);
            return null;
        }
    };

    const initializeDownloader = () => {
        isExiting = false;
        loadHistory();
        createUI();
        resetState();
        updateStatus('Ready. Click "Check Videos" to start.');

        const styleId = `${PANEL_ID}-styles`;
        if (!document.getElementById(styleId)) {
            const styleSheet = document.createElement("style");
            styleSheet.id = styleId;
            styleSheet.textContent = `
                @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); } 20%, 40%, 60%, 80% { transform: translateX(5px); } }
                .douyin-video-row:hover { background-color: #f0f8ff !important; }
                label::before { content: none !important; }
            `;
            document.head.appendChild(styleSheet);
        }
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        requestAnimationFrame(() => setTimeout(initializeDownloader, 500));
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            requestAnimationFrame(() => setTimeout(initializeDownloader, 500));
        });
    }
})();



