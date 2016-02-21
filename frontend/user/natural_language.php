<?php
$title = "Practice";
include 'header.php';

$timer = ($_POST['timer'] != 'on') ? " style='display: none'" : ""; 

$nl = "";
?>
<script>
var $_POST = <?php echo json_encode($_POST); ?>;

var samplesFromDB = "<?php
$source = secureStr($_POST['source']);
$result = $db->query("SELECT * FROM natural_lang WHERE title='{$_POST['source']}'");
while ($fetch = $result->fetch_object()) {
    echo $nl.$fetch->txt;
    $nl = '\n';
}
?>";
</script>
<script src="nl.js"></script>
<script src="user.js"></script>

    <link rel="stylesheet" type="text/css" href="nl.css">

            <!-- Main Content -->
            <div class="container-fluid">
                <div class="side-body">
                    <div class="page-title row">
                        <!--<span class="title"><?php echo $title; ?></span>
                        <div class="description"> </div>
-->
                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            <a href="#">
                                <div class="card green summary-inline">
                                    <div class="card-body">
                                        <i class="icon fa fa-check fa-4x"></i>
                                        <div class="content">
                                            <div class="title" id="correct">0</div>
                                            <div class="sub-title">Correct Attempts</div>
                                        </div>
                                        <div class="clear-both"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            <a href="#">
                                <div class="card red summary-inline">
                                    <div class="card-body">
                                        <i class="icon fa fa-times fa-4x"></i>
                                        <div class="content">
                                            <div class="title" id="incorrect">0</div>
                                            <div class="sub-title">Incorrect Attempts</div>
                                        </div>
                                        <div class="clear-both"></div>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12"<?php echo $timer; ?>>
                            <a href="#">
                                <div class="card blue summary-inline">
                                    <div class="card-body">
                                        <i class="icon fa fa-clock-o fa-4x"></i>
                                        <div class="content">
                                            <div class="title"><span id="time_spent">0</span>s</div>
                                            <div class="sub-title">Time Spent</div>
                                        </div>
                                        <div class="clear-both"></div>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            <a href="#">
                                <div class="card yellow summary-inline">
                                    <div class="card-body">
                                        <i class="icon fa fa-percent fa-4x"></i>
                                        <div class="content">
                                            <div class="title" id="ratio">N/A%</div>
                                            <div class="sub-title">Correct/Incorrect Ratio</div>
                                        </div>
                                        <div class="clear-both"></div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        

                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="card">
                                <div class="card-header">
                                    <div class="card-title">
                                        <div class="title">Problem <span id="problem_num">1</span><span id="problem_slash"></span></div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div>

                                    <!--Correct: <span id="correct">0</span>, incorrect: <span id="incorrect">0</span>.
                                    <br /><br />-->

<center id="loading"><img src="loading.gif" width="150px" style="padding: 10px;" /></center>


<span id="complete" style="display: none;">
    <center style="font-size: 16.5px;">Congratulations!<br /><br />You have completed all the problems!
    <br /><br />
    <a href="start"><button type="button" class="btn btn-default">Start New Session!</button></a>
    </center><br />
</span>


<span id="part1" style="display: none;">
    <center style="font-size: 16.5px;">Click on the <span id="subproblems"></span><span id="totalsubproblems"></span> word<span class="ess">(s)</span> or punctuation<span class="ess">(s)</span> violating formal English docs.</center><br />
    <div class="container">
    <pre id="code"><!--
    <span class="line" data-lineNum="1">def print_hi(name)</span>
    <span>  puts "Hi, #{name}"</span>
    <span>end</span>
    <span></span>
    <span>print_hi('Tom')</span>
    <span>#=> prints 'Hi, Tom' to STDOUT.</span>-->
    </pre>
    </div> <!-- container -->
</span> <!-- part1 -->

<span id="debug" style="display: none"></span>


<span id="part2" style="display: none">
<br /><br />
<center id="part2_msg" style="font-size: 16.5px;">What is the reason for this violation?</center>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                            <a href="#">
                                                <div class="card red summary-inline" id="click1">
                                                    <div class="card-body clicky">
                                                        <div class="content nf">
                                                            <!--<div class="title">A</div>-->
                                                            <div class="sub-title" id="ans1" style="float: none"> </div>
                                                        </div>
                                                        <div class="clear-both"></div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" id="click2">
                                            <a href="#">
                                                <div class="card yellow summary-inline">
                                                    <div class="card-body clicky">
                                                        <div class="content nf">
                                                            <div class="sub-title" id="ans2"> </div>
                                                        </div>
                                                        <div class="clear-both"></div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" id="click3">
                                            <a href="#">
                                                <div class="card green summary-inline">
                                                    <div class="card-body clicky">
                                                        <div class="content nf">
                                                            <div class="sub-title" id="ans3"> </div>
                                                        </div>
                                                        <div class="clear-both"></div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12" id="click4">
                                            <a href="#">
                                                <div class="card blue summary-inline">
                                                    <div class="card-body clicky">
                                                        <div class="content nf">
                                                            <div class="sub-title" id="ans4"> </div>
                                                        </div>
                                                        <div class="clear-both"></div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                </span>     <!-- part 2-->

<br />
<div class='alert alert-danger' role='alert' id='bsError' style='display: none'>You have submitted the wrong answer. Please try again!</div>


<br />
<span id="session_summary">
</span>
<center>
<button type="button" class="btn btn-danger" id="end_session">End Session</button><br />

                                <!-- end div thingy -->
                                    <!--
                                        <textarea class="form-control" ng-model="msg" rows="3"></textarea>
                                    -->

                                    </div></div>


        </div>  </div>
        </div>  </div>
        </div>



<?php include 'footer.php'; ?>