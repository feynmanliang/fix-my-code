<?php
$title = "Practice Config";
include 'header.php';
?>
<script src="start.js"></script>

            <!-- Main Content -->
            <div class="container-fluid">
                <div class="side-body">
                    <div class="page-title">
                        <span class="title"><?php echo $title; ?></span>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="card">
                                <div class="card-body">
                                <form method="POST" action="form">
                                <span id="git">
                                    <div class="sub-title">Github Username</div>
                                    <div>
                                        <input type="text" class="form-control" placeholder="Github Username" value="jscs-dev" name='user'> <!-- feynmanliang -->
                                    </div>

                                    <div class="sub-title">Repository</div>
                                    <div>
                                        <input type="text" class="form-control" placeholder="Repository" value="node-jscs" name='repo'> <!-- fix-my-code -->
                                    </div>

                                    <!--<div class="sub-title">Language</div>
                                    <div>
                                        <select name='style' id='style'>
                                                <option value="GoogleJS">Google JS Style</option>
                                        </select>
                                    </div>-->

                                </span><!-- git -->

                                    <div class="sub-title">Language</div>
                                    <div>
                                        <select name='lang' id='lang'>
                                                <option value="JS" selected>JavaScript</option>
                                                <option value="Natural_Language">Natural Language</option>
                                        </select>
                                    </div>

                                <span id="language" style="display: none">

                                    <div class="sub-title">Sample Text Source</div>
                                    <div>
                                        <select name='source' id='source'>
                                                <option value="random_examples1" selected>Random Examples #1</option>
                                                <option value="random_examples2">Random Examples #2</option>
                                                <option value="custom_input">Custom Input</option>
                                        </select>
                                    </div>
                                    <span id="cu" style="display: none">
                                        <div class="sub-title">Custom Input<br /><small><b>Note:</b> Seperate each text sample by a line break.</small></div>
                                        <div>
                                            <textarea class="form-control" rows="3" name="text"></textarea>
                                        </div>
                                    </span><!--cu-->

                                </span> <!-- lang -->

                                    <div class="sub-title">Timer</span></div>
                                    <div>
                                        <input type="checkbox" class="toggle-checkbox" name="timer" checked>
                                    </div>


                                    <div><br /><br />
                                    <button type="submit" class="btn btn-default">Start!</button>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
<?php include 'footer.php'; ?>