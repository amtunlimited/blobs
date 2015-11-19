#!/usr/bin/python

#api.py: a Web.py interface to the blobs AI functionality

import web
import blobai

#This decides what class to use based on regular expressions
urls = (
	'/blobs/api.py/win/(.*)','win',
	'/blobs/api.py/move/(.*)','move',
	'/blobs/api.py/test/(.*)','test',
)



class win:
	"""The 'win' class is requested when checking a current board for a win state."""
	def GET(self, boardst):
		board = blobai.conv(boardst)

		if(all(board)):
			if(sum(board)>0):
				return "Computer"
			else:
				return "Player"

		#This means none of the other stuff happened
		return 0


class move:
	"""The 'move' class simply feeds the baord into the 'comMove' function"""
	def GET(self,board):	
		return blobai.comMove(blobai.conv(board))

class test:
    def GET(self,string):
        return "You typed "+string

if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()