import { Tips, TipsZh } from "../constants";
import { Messages } from "../types";

export const formatTime = (seconds: any) => {
    // 将秒数转换为分钟
    var minutes:any = Math.floor(seconds / 60); // 取整
    // 将分钟转换为两位数，不足两位前面补0
    minutes = minutes < 10 ? '0' + minutes : minutes;
    // 获取秒数的余数
    var secondsRemainder: any = seconds % 60;
    // 秒数转换为两位数，不足两位前面补0
    secondsRemainder = secondsRemainder < 10 ? '0' + secondsRemainder : secondsRemainder;
    // 拼接并返回结果
    return minutes + ':' + secondsRemainder;
}

export const getUserDevice = () => {
    let res: string = ''
    const userAgent = navigator.userAgent;
    //判断是否是移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    if (isMobile) {
        // 进一步判断是哪种移动设备
        if (/iPhone|iPad|iPod/i.test(userAgent)) {
            res = 'IOS'
        } else if (/Android/i.test(userAgent)) {
            res = 'Android'
        } else {
            res = 'Other Mobile'
        }
    } else {
        res = 'PC'
    }
    return res
}

//随机数，用于绑定id
export const uuid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
    }

    return (
        s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    )
}

export const parseMarkdown = (chunk: string): string => {
    let text = chunk;
    const matches = chunk.match(/```/g);
    const count = matches ? matches.length : 0;
    if (count % 2 !== 0) {
        // 如果计数为奇数，说明```没有成对，因此在字符串末尾添加```
        text += '\n```';
    }
    return text;
}

// 判断的是否是JSON字符串
export const isJsonObject = (str: string) => {
    if (typeof str == 'string') {
        try {
            const obj = JSON.parse(str)
            // 等于这个条件说明就是JSON字符串 会返回true
            if (typeof obj == 'object' && obj) {
                return true
            } else {
                //不是就返回false
                return false
            }
        } catch (e) {
            return false
        }
    }
    return false
}

/**
 * 解析stream流的字符串
 */
export const parseStreamText = (data: string, i18nLocale: string = 'en-US') => {
    const dataList = data?.split('\n')?.filter((l) => l !== '')
    const result: any = { 
        chatIdStr: '', 
        msgId: '', 
        data: '', 
        recommends: [], 
        displayExtra: '', 
        stop: false, 
        isCustomCard: false, 
        cardData: [], 
        count: 0, 
        greet: '', 
        errCode: '',
        linkInformation: [],
        tokenInfo: {}
    }
    let anserMsgType: string = ''
    dataList.forEach((l) => {
        try {
            // 移除"data: "前缀
            const jsonStr = l.replace('data:', '')
            console.log('jsonStr====', jsonStr)
            if (jsonStr === 'the message ends') {
                result.stop = true
            } else if (jsonStr === '30008') {
                result.errCode = '30008'
                result.stop = true
                if (i18nLocale === 'zh-CN') {
                    result.data = '您已達到每日使用上限。'
                } else if (i18nLocale === 'en-US') {
                    result.data = `You have reached your daily limit.`
                } else if (i18nLocale === 'ko-KR') {
                    result.data = `일일 한도에 도달했습니다.`
                } else if (i18nLocale === 'vi-VN') {
                    result.data = `Bạn đã đạt đến giới hạn hàng ngày của mình.`
                } else if (i18nLocale === 'sp-ES') {
                    result.data = `Has alcanzado tu límite diario.`
                } else if (i18nLocale === 'tu-TR') {
                    result.data = `Günlük limitinize ulaştınız.`
                } else if (i18nLocale === 'py-RU') {
                    result.data = `You have reached your daily limit.`
                } 
            } else if (jsonStr === '30016') {
                result.errCode = '30016'
                result.stop = true
                if (i18nLocale === 'zh-CN') {
                    result.data = '您已達到每周使用上限。'
                } else if (i18nLocale === 'en-US') {
                    result.data = `You have reached your Weekly limit.`
                } else if (i18nLocale === 'ko-KR') {
                    result.data = `주간 한도에 도달했습니다.`
                } else if (i18nLocale === 'vi-VN') {
                    result.data = `Bạn đã đạt đến giới hạn hàng tuần của mình.`
                } else if (i18nLocale === 'sp-ES') {
                    result.data = `Has alcanzado tu límite semanal.`
                } else if (i18nLocale === 'tu-TR') {
                    result.data = `Haftalık limitinize ulaştınız.`
                } else if (i18nLocale === 'py-RU') {
                    result.data = `You have reached your Weekly limit.`
                } 
            } else if (jsonStr === '1502') {
                result.stop = true
                result.errCode = '1502'
                if (i18nLocale === 'zh-CN') {
                    result.data = '您的對話已過期,請重新登入。'
                } else if (i18nLocale === 'en-US') {
                    result.data = 'Your session has expired, please login again.'
                } else if (i18nLocale === 'ko-KR') {
                    result.data = '세션이 만료되었습니다. 다시 로그인해주세요.'
                } else if (i18nLocale === 'vi-VN') {
                    result.data = 'Phiên của bạn đã hết hạn, vui lòng đăng nhập lại.'
                } else if (i18nLocale === 'sp-ES') {
                    result.data = 'Tu sesión ha expirado, por favor inicia sesión nuevamente.'
                } else if (i18nLocale === 'tu-TR') {
                    result.data = 'Oturumunuzun süresi doldu, lütfen yeniden giriş yapın.'
                } else if (i18nLocale === 'py-RU') {
                    result.data = 'Your session has expired, please login again.'
                } 
            } else if (jsonStr === '30005') {
                result.stop = true
                result.errCode = '30005'
                if (i18nLocale === 'zh-CN') {
                    result.data = '您已達到最大對話數量,請刪除部分對話以開啟新的對話。'
                } else if (i18nLocale === 'en-US') {
                    result.data = 'You have reached a maximum amount of chats, please delete some to open a new chat.'
                } else if (i18nLocale === 'ko-KR') {
                    result.data = '최대 채팅 수에 도달했습니다. 새 채팅을 시작하려면 일부 채팅을 삭제하세요.'
                } else if (i18nLocale === 'vi-VN') {
                    result.data = 'Bạn đã đạt đến số lượng tối đa các cuộc trò chuyện, vui lòng xóa một số để mở một cuộc trò chuyện mới.'
                } else if (i18nLocale === 'sp-ES') {
                    result.data = 'Has alcanzado la cantidad máxima de chats, por favor elimina algunos para abrir un nuevo chat.'
                } else if (i18nLocale === 'tu-TR') {
                    result.data = 'Maksimum sohbet sayısına ulaştınız, yeni bir sohbet açmak için bazılarını silin.'
                } else if (i18nLocale === 'py-RU') {
                    result.data = 'You have reached a maximum amount of chats, please delete some to open a new chat.'
                } 
            } else if (jsonStr === '30009') {
                result.stop = true
                result.errCode = '30009'
                if (i18nLocale === 'zh-CN') {
                    result.data = '很抱歉,您的帳號已被限制,請稍後再試。'
                } else if (i18nLocale === 'en-US') {
                    result.data = 'Sorry, your account has been restricted, please try again later!'
                } else if (i18nLocale === 'ko-KR') {
                    result.data = '죄송합니다, 계정이 제한되었습니다. 나중에 다시 시도해주세요!'
                } else if (i18nLocale === 'vi-VN') {
                    result.data = 'Xin lỗi, tài khoản của bạn đã bị hạn chế, vui lòng thử lại sau!'
                } else if (i18nLocale === 'sp-ES') {
                    result.data = 'Lo siento, tu cuenta ha sido restringida, ¡por favor intenta nuevamente más tarde!'
                } else if (i18nLocale === 'tu-TR') {
                    result.data = 'Üzgünüz, hesabınız kısıtlandı, lütfen daha sonra tekrar deneyin!'
                } else if (i18nLocale === 'py-RU') {
                    result.data = 'Sorry, your account has been restricted, please try again later!'
                }
            } else if (jsonStr === '30010' || jsonStr === '30011') {
                result.stop = true
                result.errCode = '30010'
                if (i18nLocale === 'zh-CN') {
                    result.data = '⚠️我們正在經歷異常大量的請求。請稍後再試,我們正在努力擴充系統容量。'
                } else if (i18nLocale === 'en-US') {
                    result.data = "⚠️We're experiencing exceptionally high demand. Please try later as we work on scaling our systems."
                } else if (i18nLocale === 'ko-KR') {
                    result.data = "⚠️현재 시스템 확장 작업 중입니다. 잠시 후 다시 시도해 주세요."
                } else if (i18nLocale === 'vi-VN') {
                    result.data = "⚠Chúng tôi đang trải qua nhu cầu rất cao. Vui lòng thử lại sau khi chúng tôi đang mở rộng hệ thống của mình."
                } else if (i18nLocale === 'sp-ES') {
                    result.data = "⚠️Estamos experimentando una demanda excepcionalmente alta. Por favor intenta más tarde mientras trabajamos en escalar nuestros sistemas."
                } else if (i18nLocale === 'tu-TR') {
                    result.data = "⚠️ Son derece yüksek bir taleple karşı karşıyayız. Sistemlerimizi ölçekleme üzerinde çalışırken lütfen daha sonra deneyin."
                } else if (i18nLocale === 'py-RU') {
                    result.data = "⚠️We're experiencing exceptionally high demand. Please try later as we work on scaling our systems."
                } 
            } else if (jsonStr === '99999') {
                result.stop = true
                result.errCode = '99999'
                if (i18nLocale === 'zh-CN') {
                    result.data = '⚠️親愛的用戶，Scopechat自Beta版本開放以來受到了很多關注，也收到了很多反饋，出現了我們沒有預料到的流量激增，目前AI有壹些響應的問題，我們正在進行維護和升級。您仍然可以繼續注冊，填寫您的郵箱可以第壹時間收到我們重啓的通知。感謝您的耐心等待。'
                } else if (i18nLocale === 'en-US') {
                    result.data = "⚠️Dear Scopechat Users,Due to the significant increase in traffic to our product, we are in the process of conducting maintenance and upgrades. As a result, some users may experience disruptions. We apologize for any inconvenience caused."
                } else if (i18nLocale === 'ko-KR') {
                    result.data = "⚠️Scopechat 이용자 여러분, 제품 트래픽 증가로 인해 현재 유지보수 및 업그레이드를 진행하고 있습니다. 이로 인해 일부 사용자에게 서비스 이용이 원활하지 않을 수 있습니다. 불편을 드려 죄송합니다."
                } else if (i18nLocale === 'vi-VN') {
                    result.data = "⚠Kính gửi người dùng Scopechat,Do sự gia tăng đáng kể về lưu lượng truy cập đến sản phẩm của chúng tôi, chúng tôi đang tiến hành bảo trì và nâng cấp. Do đó, một số người dùng có thể gặp gián đoạn. Chúng tôi xin lỗi vì bất kỳ sự bất tiện nào gây ra."
                } else if (i18nLocale === 'sp-ES') {
                    result.data = "⚠️Estimados usuarios de Scopechat, Debido al aumento significativo en el tráfico hacia nuestro producto, estamos realizando mantenimiento y mejoras. Como resultado, algunos usuarios pueden experimentar interrupciones. Pedimos disculpas por cualquier inconveniente causado."
                } else if (i18nLocale === 'tu-TR') {
                    result.data = "⚠️ Değerli Scopechat Kullanıcıları, Ürün trafiğimizdeki önemli artış nedeniyle bakım ve yükseltme çalışmaları yürütüyoruz. Sonuç olarak, bazı kullanıcılar kesintiler yaşayabilir. Verdiğimiz rahatsızlıktan dolayı özür dileriz."
                } else if (i18nLocale === 'py-RU') {
                    result.data = "⚠️Dear Scopechat Users,Due to the significant increase in traffic to our product, we are in the process of conducting maintenance and upgrades. As a result, some users may experience disruptions. We apologize for any inconvenience caused."
                }
            } else {
                const jsonObj = JSON.parse(jsonStr) as Messages // 将JSON字符串转换为JavaScript对象
                if (jsonObj.data === 'the message ends') {
                    result.stop = true
                } else if (jsonObj.data) {
                    result.chatIdStr = jsonObj.chatId
                    result.msgId = jsonObj.msgId
                    result.count = jsonObj.count
                    if (isJsonObject(jsonObj.data)) {
                        if (!anserMsgType) {
                            result.isCustomCard = true
                        }
                        let resData = JSON.parse(jsonObj.data)
                        if (resData.unit === 'recommend_questions') {
                            let recArr: any[] = JSON.parse(resData.fill_in_data) || []
                            result.recommends = recArr.map((item: any, index: number) => {
                                if (recArr[0].display === 'Other users are asking' && [1,2,3].includes(index)) {
                                    item.isShow = true
                                } else if (recArr[0].display !== 'Other users are asking' && [0,1,2].includes(index)) {
                                    item.isShow = true
                                } else {
                                    item.isShow = false
                                }
                                return item
                            })
                            result.displayExtra = resData.display_extra
                        } else if (resData.unit === 'greet') {
                            result.greet = resData.fill_in_data || ''
                        } else if (resData.unit === 'link_information') {
                            result.linkInformation = resData.fill_in_data ? JSON.parse(resData.fill_in_data) : []
                        } else if (resData.unit === 'token_info') {
                            result.tokenInfo = resData.fill_in_data ? JSON.parse(resData.fill_in_data) : []
                        } else {
                            result.cardData.push(resData)
                        }
                    } else {
                        anserMsgType = 'text'
                        result.data = `${result.data}${jsonObj.data}`
                    }
                }
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error((error))
        }
    })
    return result
}

export const randTips = (message: string = '') => {
    let randomString: string = ''
    if (message.includes('Please generate an analysis report in which you analyze the main bullish and bearish indicators for the token')) {
        randomString = 'Thanks for your patience as I search for real-time information across the entire web. With Scopechat, you can save up to 1 hour and 20 minutes of analysis time.'
    } else {
        const randomIndex = Math.floor(Math.random() * (Tips.length - 1))
        randomString = Tips[randomIndex]
    }
    return randomString
}

let currentText = '';
let state: string = 'pending'
let msg: string = ''
export const randEffect = (letterIndex: number = 0, txt: string = '', id: string = '', currentState: string = '', message: string = '') => {
    state = currentState
    msg = message
    let text: string = txt || randTips(message)
    if (letterIndex <= text.length && text && state === 'pending') {
        let tips: string = ''
        if (localStorage.getItem('locale') === 'zh-CN') { 
            tips = '提示：'
        } else if (localStorage.getItem('locale') === 'en-US') { 
            tips = 'Tips:'
        } else if (localStorage.getItem('locale') === 'ko-KR') { 
            tips = '팁:'
        } else if (localStorage.getItem('locale') === 'vi-VN') { 
            tips = 'Mẹo:'
        } else if (localStorage.getItem('locale') === 'sp-ES') { 
            tips = 'Consejos:'
        } else if (localStorage.getItem('locale') === 'tu-TR') { 
            tips = 'İpuçları:'
        } else if (localStorage.getItem('locale') === 'py-RU') { 
            tips = 'Tips:'
        }
        currentText = `${tips} ` + text.substring(0, letterIndex)
        const myElement: HTMLElement | null = document.getElementById(id)
        if (myElement) {
            myElement.innerHTML = currentText
        }
        letterIndex++
        setTimeout(() => {
            randEffect(letterIndex, text, id, state, message)
        }, 30) // 打字间隔时间
    } else {
        setTimeout(() => {
            if (state === 'pending') {
                randEffect(0, '', id, state, msg)
            }
        }, 2000) // 文本切换延迟时间
    }
}