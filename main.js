let Col = require('colors');
let util = require('util')

Col.setTheme({
	e: ['red'],
	he: ['bgRed', 'white'],
	f: ['magenta'],
	hf: ['bgMagenta', 'white'],
	w: ['yellow'],
	hw: ['bgYellow', 'white'],
	s: ['green'],
	hs: ['bgGreen', 'white'],
	i: ['blue'],
	hi: ['bgBlue', 'white'],
	g: ['inverse'],
	c: ['red'],
	hc: ['bgGreen', 'white']
});

let exp = {
	INDENTATION: 0,
	REAL_INDENT: 0,
	STEPS_TO_INDENT: 1,
	GROUPS_IN: [],
	NEAR_GROUP_START: false,
	NEAR_GROUP_END: false,
	CATCHED: [],
	MAX_INDENT: 10,
	MESSAGES: {
		info: " INFO ",
		warn: " WARN ",
		error: "  ERR ",
		fatal: "FATAL ",
		catch: "CATCH ",
		groupIn: "> ",
		groupOut: "< ",
	},
	/**
	 * @description Changes the maximum indentaion possible. Indenting when max-indent is already reached does nothing.
	 * @param {Number} m Maximum indentation. -1 for unlimited.
	 */
	maximumIndentation(m) {
		if (m === -1) {
			this.MAX_INDENT = Number.MAX_SAFE_INTEGER;
		} else {
			this.MAX_INDENT = m;
		}
	},
	/**
	 * @description Changes the steps used to indent each time.
	 * @param {Number} l How many spaces
	 */
	indentationLength(l) {
		this.STEPS_TO_INDENT = l;
	},
	/**
	 * @description Sets the theme of the logging. The object's elements are 'e' for error, 'he' for the error head, 'f' for fatal error, 'hf' for the fatal head, 'w' for warn, 'hw' for the warn head, 's' for success, 'hs' for the success head, 'i' for info, 'hi' for the info head, 'c' for catched error, 'hc' for catched head, 'g' for group headers. For how to define colors, see the color package guide.
	 * @param {Object} theme 
	 */
	changeTheme(theme) {
		Col.setTheme(theme);
	},
	/**
	 * @description Logs to console.
	 * @param {any} msg What to log.
	 * @param  {...any} optionalParams Substitutions. See console.log.
	 */
	log(msg, ...optionalParams) {
		this.NEAR_GROUP_START = false;
		this.NEAR_GROUP_END = false;
		process.stdout.write(" ".repeat(this.INDENTATION * this.STEPS_TO_INDENT) + util.format.apply(this, arguments) + '\n');
	},
	/**
	 * @description Logs an info message. NOTICE: to use the default head but also formatting, the second argument must be falsy.
	 * @param {String} msg What to log.
	 * @param {String} [head] The head message.
	 * @param  {...any} [optionalParams] Formats.
	 */
	info(msg, head, ...optionalParams) {
		if (head) {
			this.log(head.hi + " " + msg.i, ...optionalParams);
		} else {
			this.log(this.MESSAGES.info.hi + " " + msg.i, ...optionalParams);
		}
	},
	/**
	 * @description Logs a warning message. NOTICE: to use the default head but also formatting, the second argument must be falsy.
	 * @param {String} msg What to log.
	 * @param {String} [head] The head message.
	 * @param  {...any} [optionalParams] Formats.
	 */
	warn(msg, head, ...optionalParams) {
		if (head) {
			this.log(head.hw + " " + msg.w, ...optionalParams);
		} else {
			this.log(this.MESSAGES.warn.hw + " " + msg.w, ...optionalParams);
		}
	},
	/**
	 * @description Logs a success message. NOTICE: to use the default head but also formatting, the second argument must be falsy.
	 * @param {String} msg What to log.
	 * @param {String} [head] The head message.
	 * @param  {...any} [optionalParams] Formats.
	 */
	success(msg, head, ...optionalParams) {
		if (head) {
			this.log(head.hs + " " + msg.s, ...optionalParams);
		} else {
			this.log(this.MESSAGES.warn.hs + " " + msg.s, ...optionalParams);
		}
	},
	/**
	 * @description Logs a non-fatal error message (doesn't throw). NOTICE: to use the default head but also formatting, the second argument must be falsy.
	 * @param {String} e The error.
	 * @param {String} [head] The head message.
	 * @param  {...any} [optionalParams] Formats.
	 */
	error(e, head, ...optionalParams) {
		if (head) {
			this.log(head.he + " " + (function () {
				if (e instanceof Error) {
					return e.message.e;
				} else {
					return e.e;
				}
			})(), ...optionalParams);
		} else {
			this.log(this.MESSAGES.error.he + " " + (function () {
				if (e instanceof Error) {
					return e.message.e;
				} else {
					return e.e;
				}
			})(), ...optionalParams);
		}
	},
	/**
	 * @description Logs a fatal error message (throws). NOTICE: to use the default head but also formatting, the second argument must be falsy.
	 * @param {String} e The error.
	 * @param {String} [head] The head message.
	 * @param  {...any} [optionalParams] Formats.
	 */
	fatal(e, head, ...optionalParams) {
		if (head) {
			this.log(head.hf + " " + (function () {
				if (e instanceof Error) {
					return e.message.f;
				} else {
					return e.f;
				}
			})(), ...optionalParams);
			throw new Error(head.hf + ' ' + 'Fatal error occurred. See above for details.'.f);
		} else {
			this.log(this.MESSAGES.fatal.hf + " " + (function () {
				if (e instanceof Error) {
					return e.message.f;
				} else {
					return e.f;
				}
			})(), ...optionalParams);
			throw new Error(this.MESSAGES.fatal.hf + ' ' + 'Fatal error occurred. See above for details.'.f);
		};
	},
	/**
	 * @description Catches an error for future logging.
	 * @param {Error|string} e 
	 */
	catch(e) {
		this.CATCHED.push(e);
	},
	UNCATCH_E(e, h) {
		if (h) {
			this.log(h.hc + " " + e.c);
		} else {
			this.log(this.MESSAGES.catch.hc + ' ' + e.c);
		}
	},
	/**
	 * @description Logs all catched messages.
	 * @param {String} [head] The head message.
	 */
	uncatch(head) {
		if (head) {
			this.CATCHED.forEach(e => {
				if (e instanceof Error) {
					this.UNCATCH_E(e.message, head);
				} else {
					this.UNCATCH_E(e, head)
				}
			});
		} else {
			this.CATCHED.forEach(e => {
				if (e instanceof Error) {
					this.UNCATCH_E(e.message);
				} else {
					this.UNCATCH_E(e)
				}
			});
		}
	},
	SHIFT() {
		this.REAL_INDENT += this.STEPS_TO_INDENT;
		if (this.REAL_INDENT <= this.MAX_INDENT) this.INDENTATION = this.REAL_INDENT;
	},
	UNSHIFT() {
		if (this.REAL_INDENT - this.STEPS_TO_INDENT >= 0) {
			this.REAL_INDENT -= this.STEPS_TO_INDENT;
			this.INDENTATION = this.REAL_INDENT;
		}
	},
	/**
	 * @description Starts a group.
	 * @param {String} name The group's name.
	 */
	group(name) {
		if (!this.NEAR_GROUP_START && this.NEAR_GROUP_END) this.log();
		if (name) {
			this.log((this.MESSAGES.groupIn + name).g);
			this.SHIFT();
			this.GROUPS_IN.push(name)
		} else {
			this.log((this.MESSAGES.groupIn + 'Unnamed group').g);
			this.SHIFT();
			this.GROUPS_IN.push('Unnamed group');
		};
		this.NEAR_GROUP_START = true;
	},
	/**
	 * @description Ends the group you are in.
	 */
	ungroup() {
		if (this.NEAR_GROUP_START) this.log()
		this.UNSHIFT();
		this.log((this.MESSAGES.groupOut + " " + this.GROUPS_IN[this.GROUPS_IN.length - 1]).g);
		this.GROUPS_IN.pop();
		this.NEAR_GROUP_END = true;
	}
}

module.exports = exp;