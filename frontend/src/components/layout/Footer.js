import React, { Fragment } from 'react'

const Footer = () => {
    return (
        <Fragment>
             <footer className="animate__animated animate__headShake animate__infinite py-1">
      <p className="text-center  mt-1" style={{color: 'white'}}>
        2024, مقبول جملة ماركت - كل الحقوق محفوظة
        <br></br>
        Developed By : Mustafa Elgohary
        <br></br>
        <a className="btn btn-floating m-1" style={{fontSize: '22px',color: 'lemonchiffon'}} href="https://www.google.com/maps?q=31.1978566,29.9249265&entry=gps&lucs=,94246480,94242586,94224825,94227247,94227248,94231188,47071704,47069508,94218641,94228354,94233079,94203019,47084304,94208458,94208447&g_ep=CAISEjI0LjUwLjAuNzA0NDI3ODkxMBgAINeCAyqHASw5NDI0NjQ4MCw5NDI0MjU4Niw5NDIyNDgyNSw5NDIyNzI0Nyw5NDIyNzI0OCw5NDIzMTE4OCw0NzA3MTcwNCw0NzA2OTUwOCw5NDIxODY0MSw5NDIyODM1NCw5NDIzMzA3OSw5NDIwMzAxOSw0NzA4NDMwNCw5NDIwODQ1OCw5NDIwODQ0N0ICRUc%3D&g_st=iw" target="_blank" role="button"><i className='fas fa-location-arrow'  style={{color: 'lemonchiffon'}}></i></a>
      <a className="btn btn-floating m-1" style={{fontSize: '22px',color: 'lemonchiffon'}} href="https://wa.me/+2001277021874?text=السلام عليكم%20" target="_blank" role="button"><i className="fab fa-whatsapp" style={{color: 'lemonchiffon'}}></i></a>
      </p>
    </footer>
        </Fragment>
    )
}

export default Footer
