import type { Dictionary } from '#lib/i18n/es.ts';

export const en: Dictionary = {
	meta: {
		title: 'Notely: free, open-source sticky notes for macOS',
		description:
			'Free, open-source sticky notes for macOS. Keep ideas on your desktop with floating notes, to-do lists, color coding and GitHub issue sync in a native app.',
		ogImageAlt:
			'Notely icon next to the text: Sticky notes for macOS. Native, open source and free.'
	},
	anchors: {
		features: 'features',
		install: 'install'
	},
	header: {
		navLabel: 'Main',
		features: 'Features',
		install: 'Install',
		download: 'Download',
		openMenu: 'Open menu',
		closeMenu: 'Close menu',
		languageLabel: 'Language'
	},
	hero: {
		badge: 'In development',
		iconAlt: 'Notely app icon',
		title: 'Sticky notes for your Mac. Native, open source and free.',
		subtitle:
			'Notely keeps your ideas in view, floating right on your desktop. Jot it down, pick a color and get back to work.',
		download: 'Download for Mac',
		requirements: 'macOS 14 or later · Apple silicon and Intel',
		screenshotAlt: 'Several Notely notes floating on a macOS desktop',
		screenshotPending: 'Screenshot coming soon'
	},
	positioning: {
		heading: 'What Notely is for',
		text: "Notely isn't meant to replace your notes app. It's for the quick stuff: the idea, list or reminder you want in front of you while you work, right there on your desktop until you're done with it."
	},
	features: {
		heading: 'Features',
		floating: {
			title: 'Floating notes',
			description:
				'Every note gets its own window and picks up right where you left it: same text, same size, same spot.'
		},
		color: {
			title: 'Color-coded notes',
			description: 'Give each note its own color and tell your topics apart at a glance.'
		},
		lists: {
			title: 'To-do lists',
			description: 'Give each list a title and check things off as you go.'
		},
		markdown: {
			title: 'Markdown descriptions',
			description:
				'Items linked to an issue can have a description with basic formatting: headings, lists, checkboxes and code.'
		},
		links: {
			title: 'Link previews',
			description:
				"Type a URL and Notely turns it into a card with the page's title, description and image."
		},
		github: {
			title: 'GitHub sync',
			description:
				'Keep your notes in sync with GitHub issues. Your token is stored in the macOS Keychain.'
		}
	},
	install: {
		heading: 'Install Notely',
		download: {
			title: 'Download Notely',
			description: 'Grab the latest Notely.dmg.'
		},
		drag: {
			title: 'Drag it to Applications',
			description: 'Open the .dmg and drag Notely into your Applications folder.'
		},
		open: {
			title: 'Open it',
			description: 'Launch Notely from Applications. The first time you do, macOS will ask you to approve it.'
		},
		help: {
			heading: 'Is macOS blocking Notely?',
			intro:
				"This is normal and easy to fix. Notely is free and open source, but it isn't notarized by Apple, so macOS shows a warning the first time you open it. It only takes a few seconds to approve, and all the code is on GitHub if you'd like to look it over.",
			guides: [
				{
					title: 'macOS 14',
					steps: [
						'Find Notely in your Applications folder.',
						'Control-click → Open (right-click works too).',
						'When the warning appears, click Open again.'
					]
				},
				{
					title: 'macOS 15 or later',
					steps: [
						'Try opening Notely once. macOS will block it.',
						'Go to System Settings → Privacy & Security → Open Anyway.',
						'Look for the button next to the message about Notely.'
					]
				}
			],
			advancedHeading: 'Still blocked? For advanced users',
			copy: 'Copy',
			copied: 'Copied',
			advancedNote:
				"This Terminal command removes the quarantine flag macOS puts on downloaded apps, so it'll stop blocking Notely."
		}
	},
	openSource: {
		heading: 'Open source',
		intro:
			'Notely is MIT-licensed, and all the code is on GitHub. See how it works, suggest improvements or build it yourself.',
		repository: {
			title: 'Source code',
			description: 'Browse the Notely source on GitHub.'
		},
		issue: {
			title: 'Report a bug',
			description: 'Something not working? Open an issue and let us know.'
		},
		releases: {
			title: 'Release notes',
			description: 'See every release and what changed.'
		}
	},
	footer: {
		madeBy: 'Made by',
		license: 'MIT License'
	}
};
