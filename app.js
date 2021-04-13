var myVue = new Vue({
  el: "#app",
  data: {
    rangos: {
      ataqueMago: [3, 10],
      ataqueMagoEspecial: [10, 20],
      curacion: [7, 10],
      ataqueDragon: [5, 12]
    },
    cantidadEspeciales: null,
    saludMago: null,
    saludDragon: null,
    reinicio: false,
    turnos: []
  },
  methods: {
    atacar() {
      const damage = this.valorAleatorio(this.rangos.ataqueMago[0], this.rangos.ataqueMago[1])
      this.saludDragon -= damage
      this.turnos.unshift({
        text: `Has golpeado al dragón por ${ damage }%`,
        esMago: true
      })
      this.terminarTurno()
    },
    ataqueEspecial() {
      if(this.cantidadEspeciales > 0){
        const damage = this.valorAleatorio(this.rangos.ataqueMagoEspecial[0], this.rangos.ataqueMagoEspecial[1])
        this.saludDragon -= damage
        this.cantidadEspeciales--
        this.turnos.unshift({
          text: `Has golpeado al dragón por ${ damage }%`,
          esMago: true
        })
        this.terminarTurno()
      }
    },
    curar() {
      const healing = this.valorAleatorio(this.rangos.curacion[0], this.rangos.curacion[1])
      this.saludMago += healing
      this.turnos.unshift({
        text: `Te has curado por ${ healing }%`,
        esMago: true
      })
      if(this.saludMago > 100) {
        this.saludMago = 100
      }
      this.terminarTurno()
    },
    terminarPartida() {
      if(confirm('Rendirse y reiniciar la partida?')){
        this.reinicio = true
      }
    },
    atacarDragon() {
      const damage = this.valorAleatorio(this.rangos.ataqueDragon[0], this.rangos.ataqueDragon[1])
      this.saludMago -= damage
      this.turnos.unshift({
        text: `El dragón golpea por ${ damage }%`,
        esMago: false
      })
    },
    terminarTurno() {
      if(this.saludDragon > 0) {
        this.atacarDragon()
      } else {
        this.saludDragon = 0
        alert('Felicitaciones! Has derrotado al dragón')
        this.nuevaPartida()
      }
      if(this.saludMago <= 0) {
        this.saludMago = 0
        alert('El dragón lo ha matado, use sus poderes de resurrección para volver a intentarlo')
        this.nuevaPartida()
      }
    },
    nuevaPartida() {
      this.saludMago = 100
      this.saludDragon = 100
      this.cantidadEspeciales = 2
      this.reinicio = false
      this.turnos = []
    },
    valorAleatorio(min, max) {
      return Math.round(Math.random() * (max - min) + min)
    },
    cssParaLaFila(turno) {
      if(turno.esMago) {
        return "player-turno"
      } else {
        return "monster-turno"
      }
    }
  },
  computed: {
    hayEspeciales() {
      return this.cantidadEspeciales > 0
    },
    hayTurnos() {
      return this.turnos.length > 0
    }
  },
  created(){
    this.nuevaPartida()
  }
})