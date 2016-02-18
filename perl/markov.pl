#!/usr/local/bin/perl5
##########################################################
#
# markov2.pl
#
# a second version of markov to use the speed up gained in travesty2.pl by Ron Starr
#
#
# Generates a text matching word frequency of input text. The algorithm is identical to Travesty2.pl, except that the units manipulated are 
# "words" rather than individual letters.
# 
#
# Program does no error checking--you're on your own.
#
#
# Command-line options: -g <number>The granularity--the number of words to use to determine the next word. Defaults to 3. -o <number>The 
#number of words to output. Defaults to 25.
#
#
# Program reads from standard input. All output is to standard output.
#
#
# Revision History 05/21/00Version that constructs the table
#
###########################################################
 
use Getopt::Std; 
getopts ("g:o:");

# Set the max letters of output.
$MAXWORDS = ($opt_o)? $opt_o : 25;

# Set the granularity
$GRAIN = ($opt_g)? $opt_g : 3; if( $GRAIN < 1 ) { die "granularity must be >= 1\n"; }

# Set number of letters per line in output
$LETTERS_LINE = 65;

# Set $_ as $opt_t

#$_ = $opt_t ;

#
# pull in the text, break it into words, put in word array
#
while(<>) { 
	chop; 
	$text = $_ . " ";
	#$text = $opt_t;

#
# regularize whitespace in order to split text into words
#
	$text =~ s/^\s+//g; # remove leading blanks 
	$text =~ s/\s+/ /g; # convert any whitespace to blanks 
	$text =~ s/ +/ /g; # eliminate any multiple blanks... 
	push @textwords, split (/ /, $text); # split text into "words"
}

#
# generate the frequency table
#
# calculate outer loop limits

$loopmax = $#textwords - ($GRAIN - 2) - 1;

# go through all lists of $GRAIN words in the text
for ($j = 0; $j < $loopmax; $j++) { 
	$key_string = ""; 
	for ($k = $j; $k < $j + $GRAIN; $k++) {

# build the key string (GRAIN - 1) words
		$key_string .= $textwords[$k];
	}
	$frequency_table{$key_string} .= $textwords[$j + $GRAIN] . " ";
}

# dump the table for debugging 
#foreach $key (sort keys %frequency_table) { print "$key"," = ",$frequency_table{$key},"\n";}
#exit(0);
#
# generate the markov text
#
# set a buffer to nada
$buffer="";

# start with a seed of the first $GRAIN words from the text
for ($i = 0; $i < $GRAIN; $i ++) { 
	push @lastwords, $textwords[$i]; 
	$buffer .= ($textwords[$i] . " ");
}

# now, do the actual generation
for ($i = 0; $i < $MAXWORDS; $i++) {

# see if the current last words are in the table construct the key string from the lastwords
	$key_string = ""; 
	for ($j = 0; $j < $GRAIN; $j++) { 
	$key_string .= $lastwords[$j]; } 

if ( exists $frequency_table{$key_string} ) {

# we have possible words split the list of words that follow the key string
	@possible = split " ", $frequency_table{$key_string};

# select the next word
	$nextword = $possible[rand @possible];

# add word to buffer and dump buffer if ready for output
	$buffer .= ($nextword . " "); 
	if( ( length $buffer ) >= $LETTERS_LINE ) { 
		print $buffer,"\n"; 
		$buffer="";
}

# adjust the lastwords array
for($l = 0; $l < $GRAIN - 1; $l++) { 
	$lastwords[$l] = $lastwords[$l+1]; } 
	$lastwords[$GRAIN - 1] = $nextword;
}
else { # we drew a blank

# re-seed the generation with the first $GRAIN words from the text
	@lastwords = (); 
	for ($l = 0; $l < $GRAIN; $l++) { 
	push @lastwords, $textwords[$l]; 
	$buffer .= ($textwords[$l] . " ");
	}
}
} # end $i loop
if( (length $buffer) > 0) { print $buffer, "\n"; $buffer = ""; }
exit (0);
