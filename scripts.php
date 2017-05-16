<?php
$SCRIPTS = array();
array_push($SCRIPTS,"libs/bower_components/jquery/dist/jquery.min.js");
array_push($SCRIPTS,"libs/bower_components/bootstrap/dist/js/bootstrap.min.js");
array_push($SCRIPTS,"libs/bower_components/masonry/dist/masonry.pkgd.min.js");
array_push($SCRIPTS,"libs/bower_components/isotope/dist/isotope.pkgd.min.js");
array_push($SCRIPTS,"libs/bower_components/isotope-fit-columns/fit-columns.js");
array_push($SCRIPTS,"libs/bower_components/isotope-cells-by-column/cells-by-column.js");
array_push($SCRIPTS,"libs/bower_components/isotope-cells-by-row/cells-by-row.js");
array_push($SCRIPTS,"libs/bower_components/isotope-fit-columns/fit-columns.js");
array_push($SCRIPTS,"libs/bower_components/isotope-masonry-horizontal/masonry-horizontal.js");
array_push($SCRIPTS,"libs/bower_components/flickity/dist/flickity.pkgd.min.js");
array_push($SCRIPTS,"libs/bower_components/pixi.js/dist/pixi.min.js");
array_push($SCRIPTS,"js/build.tara.js");
array_push($SCRIPTS,"js/grid.tara.js");

foreach($SCRIPTS as $script):
    if(!preg_match('/libs/', $script))
        $script.='?'.substr(md5(rand()),0,3);
    echo '<script src="'.$script.'"></script>';
endforeach;