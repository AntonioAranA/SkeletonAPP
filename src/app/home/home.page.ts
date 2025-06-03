import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements AfterViewInit {
  username: string;
  nombre: string = '';
  apellido: string = '';
  nivel: string = '';
  fechaNacimiento: string = '';

  constructor(
    private router: Router,
    private animationCtrl: AnimationController,
    private alertCtrl: AlertController
  ) {
    const nav = this.router.getCurrentNavigation();
    this.username = nav?.extras?.state?.['username'] || 'Usuario';
  }

  ngAfterViewInit() {
    const titulo = document.querySelector('ion-title');
    if (titulo) {
      const anim = this.animationCtrl.create()
        .addElement(titulo)
        .duration(1000)
        .fromTo('opacity', '0', '1')
        .fromTo('transform', 'translateY(-20px)', 'translateY(0)');
      anim.play();
    }
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  async mostrarDatos() {
   const fechaFormateada = this.formatearFecha(this.fechaNacimiento);
    const alert = await this.alertCtrl.create({
    header: 'Usuario',
    message:
      `Su nombre es: ${this.nombre} ${this.apellido}\n` +
      `Nivel de Educación: ${this.nivel}\n` +
      `Fecha de Nacimiento: ${fechaFormateada}`,
    buttons: ['OK']
  });

  await alert.present();
}


  async limpiarCampos() {
    const ids = ['#nombreInput', '#apellidoInput'];
    ids.forEach((id) => {
      const el = document.querySelector(id);
      if (el) {
        const anim = this.animationCtrl.create()
          .addElement(el)
          .duration(1000)
          .fromTo('transform', 'translateX(-100%)', 'translateX(0)');
        anim.play();
      }
    });

    this.nombre = '';
    this.apellido = '';
    this.nivel = '';
    this.fechaNacimiento = '';

    const alert = await this.alertCtrl.create({
      header: 'Campos limpios',
      message: 'Los campos han sido limpiados correctamente.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
