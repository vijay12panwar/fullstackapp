import React from 'react'
import '../styles/footer.css'
const Footer = () => {
  return (
    <div><footer class="footer">
    <div class="container row">
        <div class="footer-col">
            <h4>company</h4>
            <ul>
                <li><a href="#">about us</a></li>
                <li><a href="#">our services</a></li>
                <li><a href="#">privacy policy</a></li>
                <li><a href="#">visit website</a></li>
            </ul>
        </div>
        <div class="footer-col">
            <h4>get help</h4>
            <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">shipping</a></li>
                <li><a href="#">returns</a></li>
                <li><a href="#">order status</a></li>
                <li><a href="#">payment options</a></li>
            </ul>
        </div>
        <div class="footer-col">
            <h4>online shop</h4>
            <ul>
                <li><a href="#">download</a></li>
                <li><a href="#">changelog</a></li>
                <li><a href="#">github</a></li>
                <li><a href="#">all version</a></li>
            </ul>
        </div>
        <div class="footer-col">
            <h4>follow us</h4>
            <div class="social-links">
                <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
                
                <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
            </div>
        </div>
    </div>
</footer></div>
  )
}

export default Footer