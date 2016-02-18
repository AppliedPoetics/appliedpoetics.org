#!/usr/local/bin/perl5
##########################################################
#
# travesty2.pl
#
# a third version of travesty to try to speed things up
# by Ron Starr
#
#
# Generates a text matching letter frequency of input text. 
# 
#
# Program does no error checking--you're on your own.
#
#
# Command-line options:
#	-g <number>	The granularity--the number of letters to use to determine
#			the next letter. Defaults to 3.
#	-o <number>	The number of letters to output. Defaults to 100.
#
#
# Program reads from standard input.
# All output is to standard output.
#
#
# Revision History
#	05/16/00	First version started.
#	05/18/00	ftravesty - attempt to do things w/
#			integers
#	05/21/00	Version that constructs the table
#	09/20/15	Added saving/appending to text file
#
###########################################################
 
use Getopt::Std;
getopts ("g:o:");

# Set the max letters of output.
$MAXLETTERS = ($opt_o)? $opt_o : 100;

# Set the granularity
$GRAIN = ($opt_g)? $opt_g : 3;
if( $GRAIN < 1 ) { die "granularity must be >= 1\n"; }

# Set number of letters per line in output
$LETTERS_LINE = 70;

# Process $opt_t as $text, through $_

#$_ = ($opt_t);

#
# pull in the text, break it into letters, put in letter array
#
while(<>) {

	chop;
	$text = $_ . " ";
	#
	# regularize whitespace in order to split text into letters
	#
	$text =~ s/^\s+//g; # remove leading blanks	
	$text =~ s/\s+/ /g; # convert any whitespace to blanks
	$text =~ s/ +/ /g;  # eliminate any multiple blanks...
	push @textletters, split (//, $text); # split text into letters

}


#
# generate the frequency table
#

# calculate outer loop limits
$loopmax = $#textletters - ($GRAIN - 2) - 1;


# go through all lists of $GRAIN letters in the text

for ($j = 0; $j < $loopmax; $j++) {

	$key_string = "";

	for ($k = $j; $k < $j + $GRAIN; $k++) {
		
		# build the key string (GRAIN - 1) letters

		$key_string .= $textletters[$k];
	}

	$frequency_table{$key_string} .= $textletters[$j + $GRAIN];

}

# dump the table for debugging
# foreach $key (sort keys %frequency_table) {
#	 print "$key"," = ",$frequency_table{$key},"\n";
# }

#
# generate the travesty
#

# set a buffer to nada
@buffer=();

# start with a seed of the first $GRAIN letters from the text
for ($i = 0; $i < $GRAIN; $i ++) {
	push @lastletters, $textletters[$i]; 
	push @buffer, $textletters[$i]; 
}

# now, do the actual generation

for ($i = 0; $i < $MAXLETTERS; $i++) {

	# see if the current last letters are in the table

	# construct the key string from the lastletters
	$key_string = "";	
	for ($j = 0; $j < $GRAIN; $j++) { $key_string .= $lastletters[$j]; }

	if ( exists $frequency_table{$key_string} ) {

		# we have possible letters

		# split the list of letters that follow the key string
		@possible = split "", $frequency_table{$key_string};

		# select the next letter
		$nextletter = $possible[rand @possible];
		
		# add letter to buffer and dump buffer if ready for output
		push @buffer, $nextletter;
		if($#buffer >= $LETTERS_LINE && $buffer[$#buffer] eq " ") {
			print @buffer,"\n";
			open(my $fh, '>>travesty.txt'); say $fh @buffer; close $fh;
			@buffer=();
		}

		# adjust the lastletters array
		for($l = 0; $l < $GRAIN - 1; $l++) { $lastletters[$l] = $lastletters[$l+1]; }
		$lastletters[$GRAIN - 1] = $nextletter;

		
	}
	else { 	# we drew a blank

		# re-seed the generation with the first $GRAIN letters from the text
		@lastletters = ();
		for ($l = 0; $l < $GRAIN; $l++) {
			push @lastletters, $textletters[$l];  
			push @buffer, $textletters[$l];
		}
	}

} # end $i loop

if($#buffer >= 0) { print @buffer, "\n"; @buffer = ();} 
unlink $ARGV;
exit (0);
