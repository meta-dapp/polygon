const {
    Instance,
    TokenDecimals } = require('./contract')
const decode = require('./decode')
const { config } = require('./getConfig')
const types = require('./types')

const getAmountOut = async (tokenIn, tokenOut, amount) => {
    const ContractQuickSwap = (await Instance(
        types.ROUTER,
        config.routerAddress, config)).methods

    const tokenInDecimals = await TokenDecimals(tokenIn)
    const tokenOutDecimals = await TokenDecimals(tokenOut)
    const amountIn = decode.ToWei(amount, tokenInDecimals)

    const amounts = await ContractQuickSwap.getAmountsOut(amountIn, [tokenIn, tokenOut]).call()
    var amountOutMin = decode.FromWei(amounts[amounts.length - 1], tokenOutDecimals)
    const expectedAmount = amountOutMin
    amountOutMin -= ((amountOutMin * (config.slippage / 100)))

    return {
        amountOutMin, // Cantidad minima que acepta recibir
        expectedAmount // Cantidad estimada que va a recibir
    }
}

const Run = async () => {
    const tokenIn = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270' // WMATIC
    const tokenOut = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' // USDT
    const amountIn = 50

    const amounts = await getAmountOut(
        tokenIn,
        tokenOut,
        amountIn
    )

    console.log(amounts)
}

Run()