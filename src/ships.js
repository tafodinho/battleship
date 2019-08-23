import Ship from './Ship'

const ship1 = new Ship(["p00", "p01", "p02"])
const ship2 = new Ship(["p67", "p77", "p87"])
const ship3 = new Ship(["p51", "p61"])
const ship4 = new Ship(["p37", "p38"])
const ship5 = new Ship(["p24", "p34", "p44", "p54"])
const ship6 = new Ship(["p17"])
const ship7 = new Ship(["p92"])
const ship8 = new Ship(["p73", "p74", "p75"])

const cship1 = new Ship(["c00", "c01", "c02"])
const cship2 = new Ship(["c67", "c77", "c87"])
const cship3 = new Ship(["c51", "c61"])
const cship4 = new Ship(["c37", "c38"])
const cship5 = new Ship(["c24", "c34", "c44", "c54"])
const cship6 = new Ship(["c17"])
const cship7 = new Ship(["c92"])
const cship8 = new Ship(["c73", "c74", "c75"])

const playerShips = [ship1, ship2, ship3, ship4, ship5, ship6, ship7, ship8]
const computerShips = [cship1, cship2, cship3, cship4, cship5, cship6, cship7, cship8]

export { playerShips, computerShips }