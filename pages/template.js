const Templates = {
  header: `
    <div class='header-content'>
      <div class='brand-container'>
        <a>
          <img width=50 height=50 src='img/image001.jpg'>
          <span>Black<span class='brand-box'>Box</span><span>&nbsp</span><span>Haul Off</span></span>
        </a>
      </div>
      <div class='menus-container'>
        <div data-name='menu_dropdown' class='menu-dropdown'>
          <a>About</a>
          <div class='menu-dropdown-container menu-hidden' name='menu_dropdown'>
            <a data-menu='about' data-name='menu'>About us</a>
            <a data-menu='faq' data-name='menu'>F.A.Q.</a>
          </div>
        </div>
      </div>
      <div class='burger-container'>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-name='burger'>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    </div>
  `,
  formContainer:`<div class='booking form-container' data-name='container'></div>`,
  formSearch: `
    <form class='booking form search' data-name='form' name='form' id='form' method='post'>
      <h1 class='title'>Search</h1>
      <p>
        Please provide the location of the delivery and some important details, for us to better serve you.
      </p>
      <div class='input-container'>
        <label class='label' for='waste_type'>What will you be disposing of?</label>
        <div>
          <div class="select">
            <select name='waste_type' id='waste_type'>
              <option>Construction/Trash</option>
              <option>Electronics</option>
            </select>
          </div>
        </div>
      </div>      
      <div class='input-container'>
        <label class='label' for='date'>Date</label>
        <input class='input' type='date' id='date' name='date'>
      </div>
      <div class='input-container'>
        <label class='label' for='zip'>Zip Code</label>
        <input class='input' type='text' placeholder='zip code' id='zip' name='zip'>
      </div>
      <div class='input-container'>
        <label class='label' for='size'>Size</label>
        <div class='yard'>
          <div class="select" >
            <select name='size' id='size'>
              <option>12 Yards</option>
              <option>15 Yards</option>
              <option>20 Yards</option>
            </select>
          </div>
        </div>
      </div>
      <div class='button-container'>
        <button class='button is-success hvr-float-shadow' type='submit' data-name='search'>Search</button>
      </div>
    </form>`
  ,
  formBook:`
    <div class='modal is-active' data-name='container'>
      <div class='modal-background'></div>
      <button class="modal-close is-large" aria-label="close" data-name='close'></button>
      <form data-name=form class='form box booking book' name='form' id='form' method='post'>
        <h1 class='title'>Booked:</h1>
        <div class='input-container block'>
          <h3 class='option-title'>Delivery Options</h3>
        </div>
        <div class='input-container'>
          <label class='label' for='mode'>Mode</label>
          <div>
            <div class="select">
              <select name='mode' id='mode'>
                <option>Single Use</option>
                <option>Subscription</option>
              </select>
            </div>
          </div>
        </div>
        <div class='input-container'>
          <label class='label' for='time'>Time</label>
          <input class='input' type='time' placeholder='time' id='time' name='time'>
        </div>
        <div class='input-container'>
          <label class='label' for='time'>Would you like to schedule pickup now?</label>
          <div class='input-container'>
            <div class='radio-container horizontal'>
              <div>
                <input type='radio' name='pick_up' id='yes' value='yes' >
                <label class='label' for='yes' style='margin-left: 10px'>Yes</label>
              </div>
              <div>
                <input type='radio' name='pick_up' id='no' value='no' checked>
                <label class='label' for='no' style='margin-left: 10px'>No</label>
              </div>
            </div>
          </div>
        </div> 
        <hr>
        <div class='input-container block'>
          <h3 class='option-title'>Contact Information</h3>
        </div>
        <div class='input-container block'>
          <label class='label'>When & where do you need delivery?</label>
        </div>
        <div class='input-group'>
          <div class='input-container'>
            <label class='label' for='name'>Name</label>
            <input class='input' type='text' placeholder='Name' id='name' name='name'>
          </div>
          <div class='input-container'>
            <label class='label' for='contact'>Contact Number</label>
            <input class='input' type='text' placeholder='contact number' id='contact' name='contact'>
          </div>
          <div class='input-container'>
            <label class='label' for='email'>Email</label>
            <input class='input' type='email' placeholder='email address' id='email' name='email'>
          </div>
          <div class='input-container'>
            <label class='label' for='address'>Complete Address</label>
            <input class='input' type='text' placeholder='complete address' id='address' name='address'>
          </div>
        </div>
        <div class='button-container'>
          <button class='button is-success hvr-float-shadow' type='submit' data-name='submit'>Submit</button>
        </div>
      </form>
    </div>
  `,
  footer:`
    <div class='footer-container'>
      <div class='footer-brand'>
        <img class='footer-avatar' src='img/image001.jpg' width= 40 height=40>
        <div class='footer-brand-name'>
          <span>Black</span><span class='brand-box'>Box</span><span>&nbsp</span><span>Haul Off</span>
        </div>
      </div>
      <div class='footer-about'>
        <div class='footer-name'>About</div>
        <div class='footer-items'>Who we are</div>
        <div class='footer-items'>How we operate</div>
        <div class='footer-items'>Our offices</div>
      </div>
      <div class='footer-Contact'>
        <div class='footer-name'>Contact</div>
        <div class='footer-items'>Business</div>
        <div class='footer-items'>Get in touch</div>
        <div class='footer-items'>Careers</div>
      </div>
      <div class='footer-social'>
        <div class='footer-name'>Follow Us</div>
        <a class="fb" href='facebook.com' target='_blank' title='facebook'></a>
        <a class="tw" href='twitter.com' target='_blank' title='twitter'></a>
        <a class="yt" href='youtube.com' target='_blank' title='youtube'></a>
      </div>
      <div class='footer-copy'>
        <p>Copyright © 2020 BlackBox Haul Off. All rights reserved.</p>
      </div>
    </div>
  `
}
