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