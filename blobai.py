import math
#blobai.py: The AI backend for "Blob" using Minimax and alpha-beta pruning
#Built in functions: score = sum and finish = all

#Check to see if there's a neighbour
n1 = [
	-8,-7,-6,
	-1,    1,
	 6, 7, 8
]

r1 = [
	-1,-1,-1,
	 0,    0,
	 1, 1, 1
] 

def conv(board):
	"""Conv converts the strings fed in into a usable board"""
	convd = {
		"x": 1,
		"o": -1,
		"b": 0
	}
	
	return map(lambda a: convd[a], list(board))

def neighbour(board, i, move):
	#top/bottom neighbour
	for data in xrange(8):
		j = n[data]
		if(i+j < 49 and i+j >= 0 and (math.trunc((i+j)/7) == math.trunc((i)/7) + r[data]) and board[i+j] == move):
			return True

	return False

#Minimax time!
#def bestMove(board, move, hist, alpha, beta, level):
def bestMove(board, move, alpha, beta, level):
	#Check if this board has been done before
	#for b in hist:
	#	if(b == board):
	#		return None
	#All checks if the board is full
	
	#This part is to limit levels
	if(level > 8 or all(board)):
	#if(all(board)):
		#if so, return the sum for the score
		return sum(board)
	
	passed = True
	
	best = -1 * move * 64
	for i in xrange(len(board)):
		if(board[i] == 0 and neighbour(board, i, move)):
			passed = False
			#Make the opposing move
			board[i] = -1*move
			
			if(move > 0):
				answer = bestMove(board, -1 * move, max(alpha, best), beta, level+1)
				if(answer >= beta):
					board[i] = 0
					return answer
				if(answer is not None):
					best = max(answer, best)
			else:
				answer = bestMove(board, -1 * move, alpha, min(beta, best), level+1)
				if(answer <= alpha):
					board[i] = 0
					return answer
				if(answer is not None):
					best = min(answer, best)
			board[i] = 0
			
			#if(answer is not None and (move * best) < (move * answer)):
			#	best = answer
			
	if(passed):
		return bestMove(board, -1*move, alpha, beta, level+1)
	return best

#same as bestMove, but checking for the computer
def comMove(board):
	
	best = -64
	alpha = -64
	
	for i in xrange(len(board)):
		if(board[i] == 0 and neighbour(board, i, 1)):
			#Make the opposing move
			board[i] = 1
			answer = bestMove(board, -1, max(alpha, best), 64, 0)
			print("The score for move {} is {}".format(i, answer))
			board[i] = 0
			if(answer is not None and best < answer):
				best = answer
				move = i
	
	return move