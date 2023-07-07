<template>
    <div>
        <!-- 这里是你要截取为图片的内容 -->
        <h1>测试测试</h1>

        <button @click="openPopup">打开弹窗</button>
    </div>
</template>
  
<script>
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';

export default {
    methods: {
        openPopup() {
            const divElement = document.documentElement;

            // 使用 html2canvas 将整个页面转换为图片
            html2canvas(divElement).then(canvas => {
                // 将 canvas 转换为图片的数据 URL
                const imageDataURL = canvas.toDataURL('image/png');

                // 创建一个 Image 对象加载生成的图片
                const image = new Image();
                image.src = imageDataURL;

                // 生成页面链接的二维码
                const qrCodeCanvas = document.createElement('canvas');
                QRCode.toCanvas(qrCodeCanvas, window.location.href, (error) => {
                    if (error) {
                        console.error(error);
                        return;
                    }

                    // 在生成的图片上绘制二维码
                    const context = canvas.getContext('2d');
                    context.drawImage(qrCodeCanvas, 10, 10); // 自定义二维码的位置

                    // 打开一个新窗口并显示生成的图片
                    const newWindow = window.open('', '_blank');
                    newWindow.document.write('<img src="' + canvas.toDataURL('image/png') + '">');

                    // 在弹窗中添加保存按钮，点击按钮触发下载
                    const saveButton = newWindow.document.createElement('button');
                    saveButton.innerText = '保存图片';
                    saveButton.addEventListener('click', () => {
                        const downloadLink = document.createElement('a');
                        downloadLink.href = canvas.toDataURL('image/png');
                        downloadLink.download = 'screenshot.png';
                        downloadLink.click();
                    });
                    newWindow.document.body.appendChild(saveButton);
                });
            });
        },
    },
};
</script>
  