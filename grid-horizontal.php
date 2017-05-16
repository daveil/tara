
  <div class="main-carousel hidden-sm hidden-xs" data-flickity='{ "cellAlign": "left", "contain": true , "pageDots": false }'>
    <?php for($i=1;$i<=12;$i++):?>
    <div class="carousel-cell">
         <div class="grid-item">
          <div class="item"><?php echo $i++;?></div>
        </div>
        <div class="grid-item">
          <div class="item"><?php echo $i;?></div>
        </div>
    </div>
  <?php endfor;?>
  </div>

<?php if(false):?>
<div class="grid-canvas horizontal hidden-sm hidden-xs">
    <div class="grid-container">
      <div class="grid-item">
        <div class="item">1</div>
      </div>
      <div class="grid-item">
        <div class="item">2</div>
      </div>
      <div class="grid-item">
        <div class="item">3</div>
      </div>
      <div class="grid-item">
        <div class="item">4</div>
      </div>
      <div class="grid-item">
        <div class="item">5</div>
      </div>
      <div class="grid-item">
        <div class="item">6</div>
      </div>
      <div class="grid-item">
        <div class="item">7</div>
      </div>
      <div class="grid-item">
        <div class="item">8</div>
      </div>
      <div class="grid-item">
        <div class="item">9</div>
      </div>
      <div class="grid-item">
        <div class="item">10</div>
      </div>
      <div class="grid-item">
        <div class="item">11</div>
      </div>
      <div class="grid-item">
        <div class="item">12</div>
      </div>
    </div>
</div>
<?php endif;?>