import 'regenerator-runtime/runtime' // this required for Parcel
import {getInfo} from "./helpers/get-info"
import {imgOk, imgStop} from "./helpers/const";

const getSystemInfo = async () => {
    return await getInfo('static')
}

const processSystemInfo = async () => {
    let nodeInfo = await getSystemInfo()
    let reload = 60000
    const elLog = $("#log-info")

    elLog.html(imgStop)

    if (nodeInfo) {
        if (Metro.utils.isObject2(nodeInfo) && nodeInfo.osInfo) {
            $("#os-distro").text(nodeInfo.osInfo.distro)
            $("#os-kernel").text(` [Build ${nodeInfo.osInfo.kernel}]`)
            $("#hostname").text(nodeInfo.osInfo.hostname)

            $("#cpu-manufacturer").text(nodeInfo.cpu.manufacturer)
            $("#cpu-brand").text(nodeInfo.cpu.brand)
            $("#cpu-cores").text(nodeInfo.cpu.physicalCores)
            $("#cpu-threads").text(nodeInfo.cpu.cores)
            $("#cpu-speed").text(nodeInfo.cpu.speed)
            $("#cpu-max-speed").text(nodeInfo.cpu.speedMax)

            const totalRam = Math.round(nodeInfo.mem.total / (1024 ** 3))
            $("#ram-total").text(totalRam + ' GiB')
            $("#memory-total").text(totalRam + ' GiB')
        }

        elLog.html(imgOk)
        // console.log("System info (re)loaded!")
    } else {
        reload = 5000
    }

    setTimeout( () => processSystemInfo(), reload)
}

setTimeout(() => processSystemInfo(), 0)

