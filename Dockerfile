FROM quay.io/gurusensei/gurubhay:latest

RUN git clone https://github.com/Hans-Xmd/VORTEX-XMD /root/sylivanus

WORKDIR /root/sylivanus/

RUN npm install --platform=linuxmusl

EXPOSE 5000

CMD ["npm", "start"]
