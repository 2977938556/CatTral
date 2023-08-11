// 这个是一个滚动动画函数
export let scrollToTop = () => {
    // 计算滚动动画的步数
    const scrollStep = window.pageYOffset / 20;

    // 创建一个定时器来执行滚动动画
    const scrollInterval = setInterval(() => {
        if (window.pageYOffset > 0) {
            // 设置滚动位置
            window.scrollBy(0, -scrollStep);
        } else {
            // 到达页面顶部，清除定时器
            clearInterval(scrollInterval);
        }
    }, 5);
}